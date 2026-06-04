const fs = require('fs');
const path = require('path');

// Define metaTitle and metaDescription for each page section
const metaTitles = {
  reels: {
    en: {
      metaTitle: "Facebook Reels Downloader - Download FB Reels in HD Free",
      metaDescription: "Download Facebook Reels videos in HD quality for free. Save viral short videos, funny clips, and trending reels without watermark. Fast and easy."
    },
    es: {
      metaTitle: "Descargador de Reels de Facebook - Descarga Reels FB en HD Gratis",
      metaDescription: "Descarga videos de Reels de Facebook en calidad HD gratis. Guarda videos cortos virales, clips divertidos y reels de tendencia sin marca de agua. Rápido y fácil."
    },
    pt: {
      metaTitle: "Baixador de Reels do Facebook - Baixe Reels FB em HD Grátis",
      metaDescription: "Baixe vídeos de Reels do Facebook em qualidade HD gratuitamente. Salve vídeos curtos virais, clipes engraçados e reels em alta sem marca d'água. Rápido e fácil."
    },
    fr: {
      metaTitle: "Téléchargeur de Reels Facebook - Télécharger Reels FB en HD Gratuit",
      metaDescription: "Téléchargez des vidéos Reels Facebook en qualité HD gratuitement. Enregistrez des vidéos courtes virales, des clips amusants et des reels tendance sans filigrane. Rapide et facile."
    },
    de: {
      metaTitle: "Facebook Reels Downloader - FB Reels in HD Kostenlos Herunterladen",
      metaDescription: "Laden Sie Facebook Reels-Videos kostenlos in HD-Qualität herunter. Speichern Sie virale Kurzvideos, lustige Clips und Trend-Reels ohne Wasserzeichen. Schnell und einfach."
    },
    ja: {
      metaTitle: "Facebook Reelsダウンローダー - FB Reelsを無料でHDダウンロード",
      metaDescription: "Facebook Reels動画を無料でHD品質でダウンロード。バイラルなショート動画、面白いクリップ、トレンドのリールを透かしなしで保存。高速で簡単。"
    },
    id: {
      metaTitle: "Pengunduh Reels Facebook - Unduh Reels FB dalam HD Gratis",
      metaDescription: "Unduh video Reels Facebook dalam kualitas HD gratis. Simpan video pendek viral, klip lucu, dan reels trending tanpa watermark. Cepat dan mudah."
    },
    vi: {
      metaTitle: "Tải Reels Facebook - Tải Reels FB HD Miễn Phí",
      metaDescription: "Tải video Reels Facebook chất lượng HD miễn phí. Lưu video ngắn viral, clip hài hước và reels xu hướng không có watermark. Nhanh và dễ dàng."
    },
    th: {
      metaTitle: "ดาวน์โหลด Reels Facebook - ดาวน์โหลด Reels FB HD ฟรี",
      metaDescription: "ดาวน์โหลดวิดีโอ Reels Facebook คุณภาพ HD ฟรี บันทึกวิดีโอสั้นไวรัล คลิปตลก และ reels กำลังเทรนด์โดยไม่มีลายน้ำ รวดเร็วและง่าย"
    },
    ar: {
      metaTitle: "تحميل فيديوهات فيسبوك ريلز - تنزيل FB Reels بجودة عالية مجاناً",
      metaDescription: "قم بتنزيل فيديوهات فيسبوك ريلز بجودة عالية مجاناً. احفظ الفيديوهات القصيرة الفيروسية والكليبات المضحكة وريلز الترند بدون علامة مائية. سريع وسهل."
    },
    zh: {
      metaTitle: "Facebook Reels下载器 - 免费下载FB Reels高清视频",
      metaDescription: "免费下载Facebook Reels高清视频。保存病毒式短视频、搞笑片段和热门reels，无水印。快速简单。"
    },
    ru: {
      metaTitle: "Загрузчик Reels Facebook - Скачать FB Reels в HD Бесплатно",
      metaDescription: "Скачайте видео Reels Facebook в HD качестве бесплатно. Сохраняйте вирусные короткие видео, смешные клипы и трендовые reels без водяных знаков. Быстро и просто."
    }
  },
  private: {
    en: {
      metaTitle: "Private Facebook Video Downloader - Download Private FB Videos",
      metaDescription: "Download private Facebook videos you have permission to view. Save videos from private groups, friends-only posts, and restricted content."
    },
    es: {
      metaTitle: "Descargador de Videos Privados de Facebook - Descarga Videos Privados FB",
      metaDescription: "Descarga videos privados de Facebook que tienes permiso para ver. Guarda videos de grupos privados, publicaciones solo para amigos y contenido restringido."
    },
    pt: {
      metaTitle: "Baixador de Vídeos Privados do Facebook - Baixe Vídeos Privados FB",
      metaDescription: "Baixe vídeos privados do Facebook que você tem permissão para visualizar. Salve vídeos de grupos privados, posts só para amigos e conteúdo restrito."
    },
    fr: {
      metaTitle: "Téléchargeur de Vidéos Privées Facebook - Télécharger Vidéos Privées FB",
      metaDescription: "Téléchargez des vidéos privées Facebook que vous avez la permission de voir. Enregistrez des vidéos de groupes privés, publications d'amis uniquement et contenu restreint."
    },
    de: {
      metaTitle: "Private Facebook Video Downloader - Private FB Videos Herunterladen",
      metaDescription: "Laden Sie private Facebook-Videos herunter, die Sie ansehen dürfen. Speichern Sie Videos aus privaten Gruppen, Nur-Freunde-Posts und eingeschränkten Inhalten."
    },
    ja: {
      metaTitle: "Facebook非公開動画ダウンローダー - 非公開FB動画をダウンロード",
      metaDescription: "閲覧権限のあるFacebookの非公開動画をダウンロード。非公開グループ、友達限定投稿、制限付きコンテンツの動画を保存。"
    },
    id: {
      metaTitle: "Pengunduh Video Pribadi Facebook - Unduh Video Pribadi FB",
      metaDescription: "Unduh video pribadi Facebook yang Anda miliki izin untuk melihat. Simpan video dari grup pribadi, postingan khusus teman, dan konten terbatas."
    },
    vi: {
      metaTitle: "Tải Video Riêng Tư Facebook - Tải Video Riêng Tư FB",
      metaDescription: "Tải video riêng tư Facebook mà bạn có quyền xem. Lưu video từ nhóm riêng tư, bài đăng chỉ bạn bè và nội dung hạn chế."
    },
    th: {
      metaTitle: "ดาวน์โหลดวิดีโอส่วนตัว Facebook - ดาวน์โหลดวิดีโอส่วนตัว FB",
      metaDescription: "ดาวน์โหลดวิดีโอส่วนตัว Facebook ที่คุณมีสิทธิ์ดู บันทึกวิดีโอจากกลุ่มส่วนตัว โพสต์เฉพาะเพื่อน และเนื้อหาที่ถูกจำกัด"
    },
    ar: {
      metaTitle: "تحميل فيديوهات فيسبوك الخاصة - تنزيل فيديوهات FB الخاصة",
      metaDescription: "قم بتنزيل فيديوهات فيسبوك الخاصة التي لديك إذن لمشاهدتها. احفظ فيديوهات من المجموعات الخاصة ومنشورات الأصدقاء فقط والمحتوى المقيد."
    },
    zh: {
      metaTitle: "Facebook私密视频下载器 - 下载FB私密视频",
      metaDescription: "下载您有权查看的Facebook私密视频。保存来自私密群组、仅好友可见帖子和受限内容的视频。"
    },
    ru: {
      metaTitle: "Загрузчик Приватных Видео Facebook - Скачать Приватные FB Видео",
      metaDescription: "Скачайте приватные видео Facebook, которые у вас есть разрешение просматривать. Сохраняйте видео из приватных групп, постов только для друзей и ограниченного контента."
    }
  },
  mp3: {
    en: {
      metaTitle: "Facebook to MP3 Converter - Extract Audio from FB Videos Free | Download Facebook Music",
      metaDescription: "Convert Facebook videos to MP3 audio files free. Extract high-quality audio from Facebook Reels, Stories, Live videos. Facebook to MP3 320kbps. No software needed."
    },
    es: {
      metaTitle: "Convertidor de Facebook a MP3 - Extraer Audio de Videos FB Gratis | Descargar Música de Facebook",
      metaDescription: "Convierte videos de Facebook a archivos de audio MP3 gratis. Extrae audio de alta calidad de Reels, Stories y videos en vivo de Facebook. Facebook a MP3 320kbps. Sin software necesario."
    },
    pt: {
      metaTitle: "Conversor Facebook para MP3 - Extrair Áudio de Vídeos FB Grátis | Baixar Música do Facebook",
      metaDescription: "Converta vídeos do Facebook para arquivos de áudio MP3 gratuitamente. Extraia áudio de alta qualidade de Reels, Stories e vídeos ao vivo do Facebook. Facebook para MP3 320kbps. Sem necessidade de software."
    },
    fr: {
      metaTitle: "Convertisseur Facebook vers MP3 - Extraire Audio des Vidéos FB Gratuit | Télécharger Musique Facebook",
      metaDescription: "Convertissez des vidéos Facebook en fichiers audio MP3 gratuitement. Extrayez de l'audio haute qualité de Reels, Stories et vidéos en direct Facebook. Facebook vers MP3 320kbps. Aucun logiciel nécessaire."
    },
    de: {
      metaTitle: "Facebook zu MP3 Konverter - Audio aus FB Videos Extrahieren Kostenlos | Facebook Musik Herunterladen",
      metaDescription: "Konvertieren Sie Facebook-Videos kostenlos in MP3-Audiodateien. Extrahieren Sie hochwertige Audio aus Facebook Reels, Stories und Live-Videos. Facebook zu MP3 320kbps. Keine Software erforderlich."
    },
    ja: {
      metaTitle: "Facebook MP3変換 - FB動画から音声を無料抽出 | Facebook音楽ダウンロード",
      metaDescription: "Facebook動画を無料でMP3音声ファイルに変換。Facebook Reels、Stories、ライブ動画から高品質音声を抽出。Facebook MP3 320kbps。ソフトウェア不要。"
    },
    id: {
      metaTitle: "Konverter Facebook ke MP3 - Ekstrak Audio dari Video FB Gratis | Unduh Musik Facebook",
      metaDescription: "Konversi video Facebook ke file audio MP3 gratis. Ekstrak audio berkualitas tinggi dari Reels, Stories, video langsung Facebook. Facebook ke MP3 320kbps. Tidak perlu software."
    },
    vi: {
      metaTitle: "Chuyển đổi Facebook sang MP3 - Trích xuất âm thanh từ video FB miễn phí | Tải nhạc Facebook",
      metaDescription: "Chuyển đổi video Facebook thành file âm thanh MP3 miễn phí. Trích xuất âm thanh chất lượng cao từ Reels, Stories, video trực tiếp Facebook. Facebook sang MP3 320kbps. Không cần phần mềm."
    },
    th: {
      metaTitle: "แปลง Facebook เป็น MP3 - แยกเสียงจากวิดีโอ FB ฟรี | ดาวน์โหลดเพลง Facebook",
      metaDescription: "แปลงวิดีโอ Facebook เป็นไฟล์เสียง MP3 ฟรี แยกเสียงคุณภาพสูงจาก Reels, Stories, วิดีโอสด Facebook แปลง Facebook เป็น MP3 320kbps ไม่ต้องใช้ซอฟต์แวร์"
    },
    ar: {
      metaTitle: "تحويل فيسبوك إلى MP3 - استخراج الصوت من فيديوهات FB مجاناً | تحميل موسيقى فيسبوك",
      metaDescription: "حول فيديوهات فيسبوك إلى ملفات صوت MP3 مجاناً. استخرج صوت عالي الجودة من Reels وStories والفيديوهات المباشرة على فيسبوك. فيسبوك إلى MP3 320kbps. لا حاجة لبرامج."
    },
    zh: {
      metaTitle: "Facebook转MP3转换器 - 免费从FB视频提取音频 | 下载Facebook音乐",
      metaDescription: "免费将Facebook视频转换为MP3音频文件。从Facebook Reels、Stories、直播视频中提取高质量音频。Facebook转MP3 320kbps。无需软件。"
    },
    ru: {
      metaTitle: "Конвертер Facebook в MP3 - Извлечь Аудио из FB Видео Бесплатно | Скачать Музыку Facebook",
      metaDescription: "Конвертируйте видео Facebook в аудиофайлы MP3 бесплатно. Извлекайте высококачественное аудио из Reels, Stories и прямых трансляций Facebook. Facebook в MP3 320kbps. Без программ."
    }
  },
  mp4: {
    en: {
      metaTitle: "Facebook to MP4 Converter - Download FB Videos as MP4 Free | HD Quality",
      metaDescription: "Convert Facebook videos to MP4 format in HD quality (1080p, 720p). Free online FB to MP4 converter - no watermark, no registration. Download Facebook videos as MP4 on any device."
    },
    es: {
      metaTitle: "Convertidor de Facebook a MP4 - Descarga Videos FB como MP4 Gratis | Calidad HD",
      metaDescription: "Convierte videos de Facebook a formato MP4 en calidad HD (1080p, 720p). Convertidor FB a MP4 online gratis - sin marca de agua, sin registro. Descarga videos de Facebook como MP4 en cualquier dispositivo."
    },
    pt: {
      metaTitle: "Conversor Facebook para MP4 - Baixe Vídeos FB como MP4 Grátis | Qualidade HD",
      metaDescription: "Converta vídeos do Facebook para formato MP4 em qualidade HD (1080p, 720p). Conversor FB para MP4 online gratuito - sem marca d'água, sem registro. Baixe vídeos do Facebook como MP4 em qualquer dispositivo."
    },
    fr: {
      metaTitle: "Convertisseur Facebook vers MP4 - Télécharger Vidéos FB en MP4 Gratuit | Qualité HD",
      metaDescription: "Convertissez des vidéos Facebook en format MP4 en qualité HD (1080p, 720p). Convertisseur FB vers MP4 en ligne gratuit - sans filigrane, sans inscription. Téléchargez des vidéos Facebook en MP4 sur n'importe quel appareil."
    },
    de: {
      metaTitle: "Facebook zu MP4 Konverter - FB Videos als MP4 Herunterladen Kostenlos | HD Qualität",
      metaDescription: "Konvertieren Sie Facebook-Videos in MP4-Format in HD-Qualität (1080p, 720p). Kostenloser Online-FB-zu-MP4-Konverter - kein Wasserzeichen, keine Registrierung. Laden Sie Facebook-Videos als MP4 auf jedem Gerät herunter."
    },
    ja: {
      metaTitle: "Facebook MP4変換 - FB動画をMP4で無料ダウンロード | HD品質",
      metaDescription: "Facebook動画をHD品質（1080p、720p）でMP4形式に変換。無料オンラインFB MP4変換 - 透かしなし、登録不要。任意のデバイスでFacebook動画をMP4としてダウンロード。"
    },
    id: {
      metaTitle: "Konverter Facebook ke MP4 - Unduh Video FB sebagai MP4 Gratis | Kualitas HD",
      metaDescription: "Konversi video Facebook ke format MP4 dalam kualitas HD (1080p, 720p). Konverter FB ke MP4 online gratis - tanpa watermark, tanpa registrasi. Unduh video Facebook sebagai MP4 di perangkat apa pun."
    },
    vi: {
      metaTitle: "Chuyển đổi Facebook sang MP4 - Tải video FB dưới dạng MP4 miễn phí | Chất lượng HD",
      metaDescription: "Chuyển đổi video Facebook sang định dạng MP4 chất lượng HD (1080p, 720p). Công cụ chuyển đổi FB sang MP4 trực tuyến miễn phí - không watermark, không cần đăng ký. Tải video Facebook dưới dạng MP4 trên mọi thiết bị."
    },
    th: {
      metaTitle: "แปลง Facebook เป็น MP4 - ดาวน์โหลดวิดีโอ FB เป็น MP4 ฟรี | คุณภาพ HD",
      metaDescription: "แปลงวิดีโอ Facebook เป็นรูปแบบ MP4 คุณภาพ HD (1080p, 720p) ตัวแปลง FB เป็น MP4 ออนไลน์ฟรี - ไม่มีลายน้ำ ไม่ต้องลงทะเบียน ดาวน์โหลดวิดีโอ Facebook เป็น MP4 ได้ทุกอุปกรณ์"
    },
    ar: {
      metaTitle: "تحويل فيسبوك إلى MP4 - تحميل فيديوهات FB بصيغة MP4 مجاناً | جودة عالية",
      metaDescription: "حول فيديوهات فيسبوك إلى صيغة MP4 بجودة عالية (1080p، 720p). محول FB إلى MP4 أونلاين مجاناً - بدون علامة مائية، بدون تسجيل. حمل فيديوهات فيسبوك بصيغة MP4 على أي جهاز."
    },
    zh: {
      metaTitle: "Facebook转MP4转换器 - 免费下载FB视频为MP4 | 高清质量",
      metaDescription: "将Facebook视频转换为MP4格式，支持高清质量（1080p、720p）。免费在线FB转MP4转换器 - 无水印、无需注册。在任何设备上将Facebook视频下载为MP4。"
    },
    ru: {
      metaTitle: "Конвертер Facebook в MP4 - Скачать FB Видео как MP4 Бесплатно | HD Качество",
      metaDescription: "Конвертируйте видео Facebook в формат MP4 в HD качестве (1080p, 720p). Бесплатный онлайн-конвертер FB в MP4 - без водяных знаков, без регистрации. Скачивайте видео Facebook как MP4 на любом устройстве."
    }
  }
};

const locales = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru'];

locales.forEach(locale => {
  const filePath = path.join(__dirname, 'locales', `${locale}.json`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add metaTitle and metaDescription to each section
    ['reels', 'private', 'mp3', 'mp4'].forEach(section => {
      if (data[section] && metaTitles[section][locale]) {
        data[section].metaTitle = metaTitles[section][locale].metaTitle;
        data[section].metaDescription = metaTitles[section][locale].metaDescription;
      }
    });
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Updated ${locale}.json`);
  } catch (error) {
    console.error(`❌ Error updating ${locale}.json:`, error.message);
  }
});

console.log('\n✨ All translation files updated!');
