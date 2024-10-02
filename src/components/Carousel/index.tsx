import { ReactNode, useEffect, useRef, useCallback, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

interface Iprops {
  items: any[]
  renderItem: (item: any, index: number) => ReactNode
  wrapperClassName?: string
}

interface IScrollActive {
  left: boolean
  right: boolean
}

interface IOffset {
  left: number
  offset: number
  offsetW: number
  width: number
  currIndex: number
}

const Carousel: React.FC<Iprops> = ({
  items,
  renderItem,
  wrapperClassName = "",
}) => {
  const scrollRef = useRef<HTMLInputElement>(null)
  const offsetRef = useRef<HTMLInputElement>(null)

  const offsetState = useRef<IOffset>({
    left: 0,
    offset: 0,
    offsetW: 0,
    width: 0,
    currIndex: 0,
  })

  const [scrollActive, setScrollActive] = useState<IScrollActive>({
    right: true,
    left: false,
  })

  const getScrollState = () => {
    const l = Number(scrollRef?.current?.scrollLeft)
    const ow = Number(offsetRef?.current?.offsetWidth)
    const sw = Number(scrollRef?.current?.offsetWidth)
    offsetState.current = {
      left: l,
      offset: l + sw,
      offsetW: ow,
      width: sw,
      currIndex: l / sw,
    }
  }

  const handleOnScroll = useCallback(() => {
    getScrollState()
    const oState = offsetState.current

    setScrollActive({
      right: oState.offsetW - oState.offset > 100,
      left: oState.left > 10,
    })
  }, [])

  const handleScrollPress = (type: string) => {
    const oState: IOffset = offsetState.current
    const currIndex: number =
      type == "left"
        ? Math.floor(oState.currIndex - 0.2)
        : Math.ceil(oState.currIndex + 0.2)

    scrollRef.current?.scrollTo({
      left: currIndex * oState.width,
      behavior: "smooth",
    })
    // oState.currIndex = type == "left" ? currIndex - 1 : currIndex + 1
  }

  useEffect(() => {
    scrollRef?.current?.addEventListener("scroll", handleOnScroll)
    getScrollState()
    setScrollActive({
      right:
        Number(offsetRef?.current?.offsetWidth) >
        Number(scrollRef?.current?.offsetWidth),
      left: false,
    })
    // remove event scroll when unmount
    return () =>
      scrollRef?.current?.removeEventListener("scroll", handleOnScroll)
  }, [])

  return items?.length ? (
    <div
      className={`${wrapperClassName} overscroll-x-none justify-center items-center flex  relative`}
    >
      <div>
        <button
          className="transition-all w-7 h-7 bg-white main-border cursor-pointer flex justify-center items-center rounded-sm hover:hover-main"
          disabled={!scrollActive.left}
          onClick={() => handleScrollPress("left")}
        >
          <BsChevronLeft size={14} />
        </button>
      </div>

      <div ref={scrollRef} className="flex overflow-auto w-full no-scrollbar">
        <div ref={offsetRef} className="flex">
          {items?.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      <div>
        <button
          className="transition-all w-7 h-7 bg-white main-border cursor-pointer flex justify-center items-center rounded-sm hover:hover-main"
          disabled={!scrollActive.right}
          onClick={() => handleScrollPress("right")}
        >
          <BsChevronRight size={14} />
        </button>
      </div>
    </div>
  ) : null
}

export default Carousel
