// 오프라인 플레이(출시 체크리스트 R55·R56): 설치할 때 화면·스크립트·이미지를 미리 받아 두고, 네트워크가 없어도 연다.
// - 캐시 이름에 빌드 번호(sw.js?v=…)를 넣어 새 배포마다 새 캐시, 옛 캐시는 지운다.
// - 화면(html)은 네트워크 우선(새 버전 즉시), 나머지는 캐시를 먼저 쓰고 뒤에서 새로 받아 갱신(stale-while-revalidate).
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
// 로즈문 개정·상점 리디자인(2026-10-07): 캐시 이름 세대를 올려 이전 방문자도 새 그림·스타일을 받는다(옛 marble-* 캐시는 activate에서 지움)
const CACHE = `marble-rm26-${VERSION}`;

/** index.html이 부르는 스크립트·스타일 + 이미지 목록(manifest.json의 images) */
async function precacheList() {
  const urls = new Set(['./', './index.html', './manifest.webmanifest']);
  try {
    const html = await (await fetch('./index.html', { cache: 'no-store' })).text();
    for (const m of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css|png|webp|woff2?))"/g)) urls.add(m[1]);
  } catch {
    /* 오프라인 설치는 기본 화면만 */
  }
  try {
    const list = await (await fetch('./manifest.json', { cache: 'no-store' })).json();
    // lazy: 크고 한 장만 쓰는 것(홈 일러스트 애니메이션)은 쓸 때 받아 캐시
    for (const im of list.images || []) if (!im.lazy) urls.add(`./${im.file}`);
  } catch {
    /* 무시 */
  }
  return [...urls];
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const c = await caches.open(CACHE);
      const urls = await precacheList();
      // 하나가 실패해도 나머지는 담는다
      await Promise.all(urls.map((u) => c.add(u).catch(() => {})));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('marble-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage || req.url.includes('version.txt')) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))),
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req);
      const fresh = fetch(req)
        .then((res) => {
          if (res.ok) c.put(req, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || fresh;
    }),
  );
});
