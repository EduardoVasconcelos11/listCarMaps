import { useEffect, useRef, useCallback } from "react"

interface Props {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
}

export function useInfiniteScroll({ hasMore, loading, onLoadMore }: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const observe = useCallback(() => {
    if (!sentinelRef.current || !hasMore || loading) return

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        onLoadMore()
      }
    })

    observerRef.current.observe(sentinelRef.current)
  }, [hasMore, loading, onLoadMore])

  useEffect(() => {
    observe()

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current)
      }
    }
  }, [observe])

  return sentinelRef
}
