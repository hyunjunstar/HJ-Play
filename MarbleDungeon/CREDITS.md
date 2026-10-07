# 사용한 애셋 출처와 라이선스

《팡팡 구슬 던전》에 들어간 모든 사운드·폰트·이미지의 출처입니다. 다른 게임의 이미지·사운드·UI를 가져온 것은 없습니다.

## 사운드

외부 사운드 파일은 하나도 쓰지 않습니다. 모든 효과음과 배경음은 `src/platform/audio.ts`가 **Web Audio API로 실행 중에 직접 합성**합니다(오실레이터·필터·직접 만든 잡음 버퍼).

| 소리 | 만든 방식 | 라이선스 |
| --- | --- | --- |
| 효과음 전부(발사, 타격(연쇄 음높이 상승), 파괴, 번개, 화상, 얼음, 독, 분열, 링, 코인, 회수, 하강, 경고, 연쇄, 진화, 보스 등장·격파, 층 클리어, 패배, 버튼, 카드, 화면 전환, 숫자 틱) | 코드 합성 | 프로젝트 자체 제작 |
| 지역별 배경음 3종(분홍 동굴·하늘색 호수·주황 공장) | 코드 합성 스텝 시퀀서(화음 진행·선율·베이스·타악) | 프로젝트 자체 제작 |
| 2026-10-07 로즈문 개정: 효과음·배경음 전부 다시 음색 설계(오르골·첼레스타·하프·유리 종·저음 쿵), 로비 테마 + 지역별 전투 테마 3종, 크로스페이드 | Web Audio 런타임 합성(`src/platform/audio.ts`), 외부 음원 없음 | 프로젝트 자체 제작 |

## 도구

| 도구 | 출처 | 라이선스 | 쓰임 |
| --- | --- | --- | --- |
| Rev2D 0.1.0 (커밋 61d0986) | https://github.com/RevStudio/Rev2D , © RevStudio | MIT | 캐릭터 리그(격자 변형·눈 깜빡임·머리카락 물리) 작성·검증·프레임 렌더. 빌드 도구로만 쓰고 게임에는 구운 그림만 들어간다 |

## 폰트

| 폰트 | 출처 | 라이선스 |
| --- | --- | --- |
| Pretendard Variable | npm `pretendard` (https://github.com/orioncactus/pretendard), © Kil Hyung-jin | SIL Open Font License 1.1 |
| Song Myung(제목) | npm `@fontsource/song-myung` (Google Fonts, JIKJI SOFT) | SIL Open Font License 1.1 |
| Cinzel(숫자·라틴) | npm `@fontsource/cinzel` (Google Fonts, Natanael Gama) | SIL Open Font License 1.1 |

## 이미지

### 로즈문 동굴 이미지 세트 (`assets/img/rm/`)

> 2026-10-07 로즈문 동굴 아트 디렉션(`docs/ART_DIRECTION.md`)에 맞춘 이미지 103장(프레임 9, 아이콘·픽업 33, 구슬 22, 블록 27, 배경 6, 로고 엠블럼 1, 키 아트·전투 포즈·마스코트 5)을 새로 만들었다. 모델은 **GPT-6 Astra**(`codex exec -m gpt-6-astra`, `$imagegen`)이며, 시안(`docs/reference/ui-target.webp`)을 잘라 낸 화면을 스타일 참고 이미지로 넣었다. 목록·프롬프트는 `tools/image-jobs-rm.mjs`, 후처리(배경 제거·번짐 제거·대칭 맞춤·9-slice 측정)는 `tools/rm-assets.ts`, 파일별 프롬프트 전문·검수 결과는 `assets/manifest.json`. 이미지 안에 글자는 없다.

> 2026-10-07 2차(구슬 재설계): 구슬 22장을 금속 테두리 없는 3D 구체(MARBLE_STYLE: 단일 하이라이트·달빛 림라이트·발광 심볼)로 GPT-6 Astra(`$imagegen`)로 다시 만들어 덮어쓰고(이전 버전은 `.shots/polish-ref/old_marbles/`), 등급 소켓 3장(`tier_socket_*`)과 9-slice 카드 프레임 3장(`tier_card_*`, 인셋은 `frames.json`)을 새로 추가했다. 프롬프트 전문은 `assets/manifest.json`.

> 2026-10-07 HUD 보강: 자원 캡슐 `capsule_res`(왼쪽 아이콘 우물), 로고 아래 문구 리본 `ribbon_tagline`(알파 페더 후처리), 작은 가격 버튼 `btn_small` 3장을 GPT-6 Astra(`$imagegen`)로 추가했다(프롬프트 전문·검수는 `assets/manifest.json`, 인셋은 `frames.json`).

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `img/rm/*` (frame_*, btn_*, plate_title, divider, bar_frame, icon_*, marble_*, block_*, pickup_*, bg_*, logo_emblem, keyart_pangi, pangi_battle_*, mascot_cat) | GPT 이미지 생성(2026-10-07, GPT-6 Astra, Codex `$imagegen`) → `tools/rm-assets.ts`로 후처리. 외부 이미지·다른 게임 자산 사용 없음 | 프로젝트 자체 제작(생성 이미지, OpenAI 이용 약관상 출력물 권리는 사용자에게 있음) |

> 2026-10-06(캐릭터 4차) 캐릭터 15장을 시안 보드 01-rose-fairy 그림체(부드러운 현대 수집형 RPG 일러스트)로 다시 그렸다. 시안 보드를 참고 이미지로 넣어 GPT 이미지 생성(Codex `$imagegen`, gpt-5.5 · `codex exec -i`), 목록·프롬프트는 `tools/image-jobs-chars-v4.mjs`와 manifest.json. 이전 그림은 `.shots/v4/img-before/`.
> 같은 날 캐릭터 움직임(홈 일러스트 3, 전투 대기·조준 6)을 **Rev2D**로 리깅해 프레임으로 구웠다(`assets/rigs/*.r2d.json` → `assets/img/anim/*.webp`).

> 2026-10-05(시안 v2) 캐릭터 15장(portrait_*·face_*·fairy_*·char_*)을 성인 판타지 캐릭터로 다시 만들었다. GPT 이미지 생성(Codex `$imagegen`, gpt-5.5), 목록·프롬프트는 `tools/image-jobs-chars-v3.mjs`와 manifest.json. 이전 그림은 `.shots/v2/img-before/`.

> 2026-10-05 아트 바이블(`docs/ART_DIRECTION.md`)에 맞춰 **모든 그림 100장을 다시 만들었다**(캐릭터 9, 블록 27, 구슬 16, 아이콘·픽업 27, 공방 시설 5, 유물 12, 배경 4). 목록·프롬프트는 `tools/image-jobs-v2.mjs`와 `assets/manifest.json`, 이전 그림은 `.shots/art-v1/`에 보관. 아래 표의 파일 이름은 그대로이고 그림만 새 화풍이다.

`assets/img/`의 이미지는 모두 이 프로젝트를 위해 **GPT 이미지 생성으로 만든 것**입니다. 프롬프트·크기·날짜는 `assets/manifest.json`에 있습니다(기획서 10.6 규격). 초록·자홍 단색 배경으로 생성한 뒤 투명 처리했습니다.

| 파일 | 출처 | 라이선스 |
| --- | --- | --- |
| block_*(젤리·딱딱 젤리·보스 × 기본·맞음·부서짐 9장), marble_basic·fire·bolt·split, pickup_ring·coin, fairy_idle·shoot·skill, bg_cave, ui_coin·pause·recall·speed·star | GPT 이미지 생성(2026-10-04), 프롬프트는 manifest.json | 프로젝트 자체 제작(생성 이미지, OpenAI 이용 약관상 출력물 권리는 사용자에게 있음) |
| ui_finger.png(튜토리얼 손가락), marble_plasma.png(진화 구슬) | GPT 이미지 생성(2026-10-05, Codex `$imagegen`) → `tools/key-image.ts`로 배경 제거·축소 | 위와 같음 |
| M4·M5 콘텐츠 63장: 구슬 6·진화 구슬 5(marble_*), 블록 6종×3상태(block_splitter·healer·mover·chest·shield·bomber), 캐릭터 2종×3포즈(char_squirrel·pig), 배경 3(bg_lake·factory·village), 공방 시설 5(fac_*), UI 아이콘 8(ui_key·shop·codex·daily·endless·adventure·settings·skill), 유물 12(relic_*) | GPT 이미지 생성(2026-10-05, Codex `$imagegen`, gpt-5.5) → `tools/key-image.ts`로 배경 제거·크기 맞춤. 목록·프롬프트는 `tools/image-jobs.mjs`와 manifest.json. 배경은 웹용 WebP | 위와 같음 |
| 상태이상 아이콘(화상·얼음·독·번개), 파편·별·고리·물방울·눈송이 입자 | `src/render/scene.ts`에서 PixiJS Graphics로 직접 그림 | 프로젝트 자체 제작 |

## 코드 라이브러리(참고)

| 라이브러리 | 라이선스 |
| --- | --- |
| PixiJS 8 | MIT |
