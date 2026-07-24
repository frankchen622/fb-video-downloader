#!/usr/bin/env python3
import json
import sys

# 翻译模板
translations = {
    'pt': {
        'nav_extra': {
            'toMp4': 'FB para MP4',
            'toMp3': 'FB para MP3',
            'reels': 'Reels',
            'privateVideos': 'Vídeos Privados'
        },
        'footer': {
            'aboutTitle': 'Sobre dlfb.io',
            'aboutText': 'dlfb.io é uma ferramenta online gratuita para baixar vídeos do Facebook, reels e convertê-los para formato MP4 ou MP3. Rápida, segura e fácil de usar em qualquer dispositivo. Não requer registro.',
            'aboutDescription': 'Perfeita para criadores de conteúdo, gerentes de mídia social, profissionais de marketing digital e qualquer pessoa que queira salvar vídeos do Facebook para visualização offline.',
            'quickLinksTitle': 'Links Rápidos',
            'home': 'Início',
            'fbToMp4': 'FB para MP4',
            'fbToMp3': 'FB para MP3',
            'reelsDownloader': 'Baixador de Reels',
            'privateVideos': 'Vídeos Privados',
            'facebookVideoDownloader': 'Baixador de Vídeos do Facebook',
            'legalTitle': 'Legal',
            'privacyPolicy': 'Política de Privacidade',
            'termsOfUse': 'Termos de Uso',
            'contactUs': 'Entre em Contato',
            'copyright': '© {year} dlfb.io. Todos os direitos reservados.',
            'disclaimer': 'Isenção de responsabilidade:',
            'disclaimerText': 'Não somos afiliados ao Facebook ou Meta. Todas as marcas registradas pertencem aos seus respectivos proprietários.'
        }
    },
    'fr': {
        'nav_extra': {
            'toMp4': 'FB vers MP4',
            'toMp3': 'FB vers MP3',
            'reels': 'Reels',
            'privateVideos': 'Vidéos Privées'
        },
        'footer': {
            'aboutTitle': 'À propos de dlfb.io',
            'aboutText': 'dlfb.io est un outil en ligne gratuit pour télécharger des vidéos Facebook, des reels et les convertir au format MP4 ou MP3. Rapide, sécurisé et facile à utiliser sur n\'importe quel appareil. Aucune inscription requise.',
            'aboutDescription': 'Parfait pour les créateurs de contenu, les gestionnaires de médias sociaux, les spécialistes du marketing numérique et toute personne souhaitant enregistrer des vidéos Facebook pour une visualisation hors ligne.',
            'quickLinksTitle': 'Liens Rapides',
            'home': 'Accueil',
            'fbToMp4': 'FB vers MP4',
            'fbToMp3': 'FB vers MP3',
            'reelsDownloader': 'Téléchargeur de Reels',
            'privateVideos': 'Vidéos Privées',
            'facebookVideoDownloader': 'Téléchargeur de Vidéos Facebook',
            'legalTitle': 'Légal',
            'privacyPolicy': 'Politique de Confidentialité',
            'termsOfUse': 'Conditions d\'Utilisation',
            'contactUs': 'Contactez-nous',
            'copyright': '© {year} dlfb.io. Tous droits réservés.',
            'disclaimer': 'Avertissement :',
            'disclaimerText': 'Nous ne sommes pas affiliés à Facebook ou Meta. Toutes les marques déposées appartiennent à leurs propriétaires respectifs.'
        }
    },
    'zh': {
        'nav_extra': {
            'toMp4': 'FB转MP4',
            'toMp3': 'FB转MP3',
            'reels': 'Reels',
            'privateVideos': '私密视频'
        },
        'footer': {
            'aboutTitle': '关于 dlfb.io',
            'aboutText': 'dlfb.io 是一个免费的在线工具，用于下载 Facebook 视频、Reels 并将其转换为 MP4 或 MP3 格式。快速、安全且易于在任何设备上使用。无需注册。',
            'aboutDescription': '非常适合内容创作者、社交媒体管理员、数字营销人员以及任何想要保存 Facebook 视频以离线观看的人。',
            'quickLinksTitle': '快速链接',
            'home': '首页',
            'fbToMp4': 'FB转MP4',
            'fbToMp3': 'FB转MP3',
            'reelsDownloader': 'Reels下载器',
            'privateVideos': '私密视频',
            'facebookVideoDownloader': 'Facebook视频下载器',
            'legalTitle': '法律',
            'privacyPolicy': '隐私政策',
            'termsOfUse': '使用条款',
            'contactUs': '联系我们',
            'copyright': '© {year} dlfb.io. 保留所有权利。',
            'disclaimer': '免责声明：',
            'disclaimerText': '我们与 Facebook 或 Meta 无关。所有商标均属于其各自所有者。'
        }
    }
}

def update_locale(lang_code, trans_data):
    filename = f'locales/{lang_code}.json'
    print(f'正在更新 {filename}...')
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 更新 nav
        if 'nav' in data:
            data['nav'].update(trans_data['nav_extra'])
        
        # 添加或更新 footer（删除旧的重复项）
        data['footer'] = trans_data['footer']
        
        # 写回文件
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'✅ {filename} 更新成功')
        return True
    except Exception as e:
        print(f'❌ {filename} 更新失败: {e}')
        return False

if __name__ == '__main__':
    for lang, trans in translations.items():
        update_locale(lang, trans)
