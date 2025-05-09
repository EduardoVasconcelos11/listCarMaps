import { useEffect, useRef, useCallback } from "react"

interface Props {
  hasMore: boolean
  onLoadMore: () => void
}

export function useInfiniteScroll({ hasMore, onLoadMore }: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const observe = useCallback(() => {
    if (!sentinelRef.current || !hasMore) return

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onLoadMore()
      }
    })

    observerRef.current.observe(sentinelRef.current)
  }, [hasMore, onLoadMore])

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
