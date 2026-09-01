$ErrorActionPreference = 'Stop'

$assetDirectory = Join-Path $PSScriptRoot '..\public\assets\characters'
New-Item -ItemType Directory -Force -Path $assetDirectory | Out-Null

$assets = @(
  [pscustomobject]@{ File = 'k-on-yui.gif'; Url = 'https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/images/chara_photo01.gif' }
  [pscustomobject]@{ File = 'k-on-mio.gif'; Url = 'https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/images/chara_photo02.gif' }
  [pscustomobject]@{ File = 'k-on-ritsu.gif'; Url = 'https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/images/chara_photo03.gif' }
  [pscustomobject]@{ File = 'k-on-tsumugi.gif'; Url = 'https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/images/chara_photo04.gif' }
  [pscustomobject]@{ File = 'k-on-azusa.gif'; Url = 'https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/images/chara_photo05.gif' }

  [pscustomobject]@{ File = 'poppinparty-kasumi.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/poppinparty/img_kasumi.png' }
  [pscustomobject]@{ File = 'poppinparty-tae.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/poppinparty/img_tae.png' }
  [pscustomobject]@{ File = 'poppinparty-rimi.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/poppinparty/img_rimi.png' }
  [pscustomobject]@{ File = 'poppinparty-saaya.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/poppinparty/img_saya.png' }
  [pscustomobject]@{ File = 'poppinparty-arisa.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/poppinparty/img_arisa.png' }

  [pscustomobject]@{ File = 'mygo-tomori.png'; Url = 'https://anime.bang-dream.com/mygo/wordpress/wp-content/themes/mygo_v1/assets/images/common/character/img_tomori.png' }
  [pscustomobject]@{ File = 'mygo-anon.png'; Url = 'https://anime.bang-dream.com/mygo/wordpress/wp-content/themes/mygo_v1/assets/images/common/character/img_anon.png' }
  [pscustomobject]@{ File = 'mygo-rana.png'; Url = 'https://anime.bang-dream.com/mygo/wordpress/wp-content/themes/mygo_v1/assets/images/common/character/img_rana.png' }
  [pscustomobject]@{ File = 'mygo-soyo.png'; Url = 'https://anime.bang-dream.com/mygo/wordpress/wp-content/themes/mygo_v1/assets/images/common/character/img_soyo.png' }
  [pscustomobject]@{ File = 'mygo-taki.png'; Url = 'https://anime.bang-dream.com/mygo/wordpress/wp-content/themes/mygo_v1/assets/images/common/character/img_taki.png' }

  [pscustomobject]@{ File = 'avemujica-uika.png'; Url = 'https://anime.bang-dream.com/avemujica/wordpress/wp-content/themes/avemujica_0102/assets/images/common/character/thumb_uika.png' }
  [pscustomobject]@{ File = 'avemujica-mutsumi.png'; Url = 'https://anime.bang-dream.com/avemujica/wordpress/wp-content/themes/avemujica_0102/assets/images/common/character/thumb_mutsumi.png' }
  [pscustomobject]@{ File = 'avemujica-umiri.png'; Url = 'https://anime.bang-dream.com/avemujica/wordpress/wp-content/themes/avemujica_0102/assets/images/common/character/thumb_umiri.png' }
  [pscustomobject]@{ File = 'avemujica-nyamu.png'; Url = 'https://anime.bang-dream.com/avemujica/wordpress/wp-content/themes/avemujica_0102/assets/images/common/character/thumb_nyamu.png' }
  [pscustomobject]@{ File = 'avemujica-sakiko.png'; Url = 'https://anime.bang-dream.com/avemujica/wordpress/wp-content/themes/avemujica_0102/assets/images/common/character/thumb_sakiko.png' }

  [pscustomobject]@{ File = 'bocchi-hitori.png'; Url = 'https://bocchi.rocks/tv/assets/img/page/character/hitori/main.png' }
  [pscustomobject]@{ File = 'bocchi-nijika.png'; Url = 'https://bocchi.rocks/tv/assets/img/page/character/nijika/main.png' }
  [pscustomobject]@{ File = 'bocchi-ryo.png'; Url = 'https://bocchi.rocks/tv/assets/img/page/character/ryo/main.png' }
  [pscustomobject]@{ File = 'bocchi-ikuyo.png'; Url = 'https://bocchi.rocks/tv/assets/img/page/character/ikuyo/main.png' }

  [pscustomobject]@{ File = 'gbc-nina.webp'; Url = 'https://girls-band-cry.com/wp-content/themes/gbc_v1-1/assets/webp/common/character/img_body-nina.webp' }
  [pscustomobject]@{ File = 'gbc-momoka.webp'; Url = 'https://girls-band-cry.com/wp-content/themes/gbc_v1-1/assets/webp/common/character/img_body-momoka.webp' }
  [pscustomobject]@{ File = 'gbc-subaru.webp'; Url = 'https://girls-band-cry.com/wp-content/themes/gbc_v1-1/assets/webp/common/character/img_body-subaru.webp' }
  [pscustomobject]@{ File = 'gbc-tomo.webp'; Url = 'https://girls-band-cry.com/wp-content/themes/gbc_v1-1/assets/webp/common/character/img_body-tomo.webp' }
  [pscustomobject]@{ File = 'gbc-rupa.webp'; Url = 'https://girls-band-cry.com/wp-content/themes/gbc_v1-1/assets/webp/common/character/img_body-rupa.webp' }

  [pscustomobject]@{ File = 'jelee-mahiru.png'; Url = 'https://yorukura-anime.com/assets/images/character/img_01.png' }
  [pscustomobject]@{ File = 'jelee-kano.png'; Url = 'https://yorukura-anime.com/assets/images/character/img_02.png' }
  [pscustomobject]@{ File = 'jelee-kiui.png'; Url = 'https://yorukura-anime.com/assets/images/character/img_03.png' }
  [pscustomobject]@{ File = 'jelee-mei.png'; Url = 'https://yorukura-anime.com/assets/images/character/img_04.png' }

  [pscustomobject]@{ File = 'rocklady-lilisa.webp'; Url = 'https://rocklady.rocks/dist/img/character/chara01/img1.webp?ver=1.0215' }
  [pscustomobject]@{ File = 'rocklady-otoha.webp'; Url = 'https://rocklady.rocks/dist/img/character/chara02/img1.webp?ver=1.0215' }
  [pscustomobject]@{ File = 'rocklady-tina.webp'; Url = 'https://rocklady.rocks/dist/img/character/chara03/img1.webp?ver=1.0215' }
  [pscustomobject]@{ File = 'rocklady-tamaki.webp'; Url = 'https://rocklady.rocks/dist/img/character/chara04/img1.webp?ver=1.0215' }

  [pscustomobject]@{ File = 'afterglow-ran.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/afterglow/img_ran.png' }
  [pscustomobject]@{ File = 'afterglow-moca.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/afterglow/img_moca.png' }
  [pscustomobject]@{ File = 'afterglow-himari.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/afterglow/img_himari.png' }
  [pscustomobject]@{ File = 'afterglow-tomoe.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/afterglow/img_tomoe.png' }
  [pscustomobject]@{ File = 'afterglow-tsugumi.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/afterglow/img_tsugumi.png' }

  [pscustomobject]@{ File = 'pastelpalettes-aya.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/pastel-palettes/img_aya.png' }
  [pscustomobject]@{ File = 'pastelpalettes-hina.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/pastel-palettes/img_hina.png' }
  [pscustomobject]@{ File = 'pastelpalettes-chisato.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/pastel-palettes/img_chisato.png' }
  [pscustomobject]@{ File = 'pastelpalettes-maya.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/pastel-palettes/img_maya.png' }
  [pscustomobject]@{ File = 'pastelpalettes-eve.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/pastel-palettes/img_eve.png' }

  [pscustomobject]@{ File = 'roselia-yukina.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/roselia/img_yukina.png' }
  [pscustomobject]@{ File = 'roselia-sayo.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/roselia/img_sayo.png' }
  [pscustomobject]@{ File = 'roselia-lisa.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/roselia/img_risa.png' }
  [pscustomobject]@{ File = 'roselia-ako.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/roselia/img_ako.png' }
  [pscustomobject]@{ File = 'roselia-rinko.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/roselia/img_rinko.png' }

  [pscustomobject]@{ File = 'hhw-kokoro.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/hello-happy-world/img_kokoro.png' }
  [pscustomobject]@{ File = 'hhw-kaoru.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/hello-happy-world/img_kaoru.png' }
  [pscustomobject]@{ File = 'hhw-hagumi.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/hello-happy-world/img_hagumi.png' }
  [pscustomobject]@{ File = 'hhw-kanon.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/hello-happy-world/img_kanon.png' }
  [pscustomobject]@{ File = 'hhw-misaki.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/hello-happy-world/img_michelle.png' }

  [pscustomobject]@{ File = 'ras-layer.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/other/img_reija.png' }
  [pscustomobject]@{ File = 'ras-lock.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/other/img_rikka.png' }
  [pscustomobject]@{ File = 'ras-masking.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/other/img_masking.png' }
  [pscustomobject]@{ File = 'ras-pareo.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/other/img_pareo.png' }
  [pscustomobject]@{ File = 'ras-chu2.png'; Url = 'https://anime.bang-dream.com/2nd/wordpress/wp-content/themes/bang-dream_2nd/assets/images/common/character/other/img_chuchu.png' }

  [pscustomobject]@{ File = 'morfonica-mashiro.png'; Url = 'https://morfonica-anime.bang-dream.com/wordpress/wp-content/themes/morfonica-anime_v0/assets/images/common/character/img_mashiro.png' }
  [pscustomobject]@{ File = 'morfonica-toko.png'; Url = 'https://morfonica-anime.bang-dream.com/wordpress/wp-content/themes/morfonica-anime_v0/assets/images/common/character/img_toko.png' }
  [pscustomobject]@{ File = 'morfonica-nanami.png'; Url = 'https://morfonica-anime.bang-dream.com/wordpress/wp-content/themes/morfonica-anime_v0/assets/images/common/character/img_nanami.png' }
  [pscustomobject]@{ File = 'morfonica-tsukushi.png'; Url = 'https://morfonica-anime.bang-dream.com/wordpress/wp-content/themes/morfonica-anime_v0/assets/images/common/character/img_tsukushi.png' }
  [pscustomobject]@{ File = 'morfonica-rui.png'; Url = 'https://morfonica-anime.bang-dream.com/wordpress/wp-content/themes/morfonica-anime_v0/assets/images/common/character/img_rui.png' }
)

$downloaded = 0
$failed = @()
foreach ($asset in $assets) {
  $destination = Join-Path $assetDirectory $asset.File
  try {
    Invoke-WebRequest -Uri $asset.Url -OutFile $destination -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0 (compatible; BandTIAssetCollector/1.0)' }
    $downloaded++
  }
  catch {
    $failed += "$($asset.File): $($_.Exception.Message)"
  }
}

Write-Output "Downloaded $downloaded of $($assets.Count) official character assets."
if ($failed.Count -gt 0) {
  Write-Output 'Failed assets:'
  $failed | ForEach-Object { Write-Output $_ }
  exit 1
}
