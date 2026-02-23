export interface WPPost {
    id: number
    date: string
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
    } = {}) => {
        const { page = 1, perPage = 6, category, slug } = options
        const lang = getLanguageParam()

        const params: Record<string, any> = {
            lang: lang,
            polylang_lang: lang, // Redundant for some Polylang configurations
            _embed: 1,
            per_page: perPage,
        }

        if (page > 1) params.page = page
        if (category) params.categories = category
        if (slug) params.slug = slug

        const posts = await $fetch<WPPost[]>(`${baseUrl}/posts`, { params })

        // Final safety filter: if the API returns posts from other languages, we filter them out.
        // Polylang usually includes terminal terms or metadata, but as a fallback 
        // we can check if the post has a 'lang' property in its response (common in Polylang REST)
        return posts.filter(post => {
            // @ts-ignore - Polylang might inject 'lang' or 'polylang_lang' directly in the root
            const postLang = post.lang || post.polylang_lang
            if (postLang) {
                return postLang.startsWith(lang)
            }
            return true // Fallback if no lang meta is found (better to show than to hide everything)
        })
    }

    const fetchCategories = async () => {
        const lang = getLanguageParam()
        const params = {
            lang: lang,
            polylang_lang: lang,
            hide_empty: true,
        }
        return await $fetch<WPCategory[]>(`${baseUrl}/categories`, { params })
    }

    const fetchPostBySlug = async (slug: string) => {
        const posts = await fetchPosts({ slug, perPage: 1 })
        return posts.length > 0 ? posts[0] : null
    }

    const fetchRelatedPosts = async (categories: number[], excludeId: number) => {
        const lang = getLanguageParam()
        const params = {
            lang: lang,
            polylang_lang: lang,
            _embed: 1,
            per_page: 3,
            categories: categories.join(','),
            exclude: excludeId,
        }
        const posts = await $fetch<WPPost[]>(`${baseUrl}/posts`, { params })

        return posts.filter(post => {
            // @ts-ignore
            const postLang = post.lang || post.polylang_lang
            if (postLang) {
                return postLang.startsWith(lang)
            }
            return true
        })
    }

    return {
        fetchPosts,
        fetchCategories,
        fetchPostBySlug,
        fetchRelatedPosts,
    }
}
