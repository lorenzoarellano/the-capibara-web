export interface WPPost {
    id: number
    date: string
    link: string
    slug: string
    title: {
        rendered: string
    }
    content: {
        rendered: string
    }
    excerpt: {
        rendered: string
    }
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string
            alt_text: string
        }>
        'wp:term'?: Array<Array<{
            id: number
            link: string
            name: string
            slug: string
            taxonomy: string
        }>>
    }
}

export interface WPCategory {
    id: number
    name: string
    slug: string
    count: number
}

export const decodeHtml = (raw: string) => {
    if (!raw) return ''

    // 1. Strip HTML tags
    let text = raw.replace(/<[^>]*>?/gm, '')

    // 2. Decode numeric entities like &#8220;
    text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))

    // 3. Decode common named entities
    const entities: Record<string, string> = {
        '&quot;': '"',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&nbsp;': ' ',
        '&hellip;': '...',
        '&iexcl;': '¡',
        '&iquest;': '¿',
        '&copy;': '©',
        '&reg;': '®'
    }

    Object.entries(entities).forEach(([entity, char]) => {
        text = text.replace(new RegExp(entity, 'g'), char)
    })

    return text.trim()
}

export const useWordPress = () => {
    const { locale } = useI18n()
    const baseUrl = 'https://news.thecapibaraweb.com.mx/wp-json/wp/v2'

    const getLanguageParam = () => {
        return locale.value === 'en' ? 'en' : 'es'
    }

    const fetchPosts = async (options: {
        page?: number
        perPage?: number
        category?: number
        slug?: string
        lang?: string
    } = {}) => {
        const { page = 1, perPage = 6, category, slug, lang: forcedLang } = options
        const lang = forcedLang || getLanguageParam()

        const params: Record<string, any> = {
            _embed: 1,
            per_page: perPage,
        }

        if (page > 1) params.page = page
        if (category) params.categories = category
        if (slug) params.slug = slug

        const posts = await $fetch<WPPost[]>(`${baseUrl}/posts`, { params })

        // Simple filter: only show news if the site language is Spanish
        if (lang === 'es') {
            return posts
        }

        return []
    }

    const fetchCategories = async (options: { lang?: string } = {}) => {
        const lang = options.lang || getLanguageParam()
        const params = {
            lang: lang,
            polylang_lang: lang,
            hide_empty: true,
        }
        const categories = await $fetch<WPCategory[]>(`${baseUrl}/categories`, { params })

        // Filter out default 'Uncategorized' category (ID 1 / slug variations)
        const excludedSlugs = ['uncategorized', 'sin-categoria']
        return categories.filter(cat => !excludedSlugs.includes(cat.slug) && cat.id !== 1)
    }

    const fetchPostBySlug = async (slug: string) => {
        const posts = await fetchPosts({ slug, perPage: 1 })
        return posts.length > 0 ? posts[0] : null
    }

    const fetchRelatedPosts = async (categories: number[], excludeId: number) => {
        const lang = getLanguageParam()
        const params = {
            _embed: 1,
            per_page: 3,
            categories: categories.join(','),
            exclude: excludeId,
        }
        const posts = await $fetch<WPPost[]>(`${baseUrl}/posts`, { params })

        if (lang === 'es') {
            return posts
        }
        return []
    }

    return {
        fetchPosts,
        fetchCategories,
        fetchPostBySlug,
        fetchRelatedPosts,
    }
}
