import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
})

export const SearchIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)
export const HeartIcon = ({ size, filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(size)} {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.6-9-9.3C2 8 4 5 7 5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3 0 5 3 4 6.2-1.500 4.700-9 9.300-9 9.300Z" />
  </svg>
)
export const UserIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
)
export const BagIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
)
export const ArrowRightIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowLeftIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
)
export const PlusIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const MinusIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14" /></svg>
)
export const CloseIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const CheckIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12.5 4.5 4.5L19 7.500" /></svg>
)
export const GoogleIcon = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...p}>
    <path fill="currentColor" d="M21.600 12.230c0-.680-.060-1.330-.170-1.950H12v3.690h5.380a4.600 4.600 0 0 1-2 3.020v2.510h3.230c1.890-1.740 2.990-4.300 2.990-7.270Z" />
    <path fill="currentColor" d="M12 22c2.700 0 4.960-.900 6.610-2.430l-3.230-2.510c-.900.600-2.040.960-3.380.960-2.600 0-4.810-1.760-5.600-4.120H3.060v2.590A10 10 0 0 0 12 22Z" />
    <path fill="currentColor" d="M6.400 13.900a6 6 0 0 1 0-3.800V7.510H3.060a10 10 0 0 0 0 8.980L6.400 13.900Z" />
    <path fill="currentColor" d="M12 5.980c1.470 0 2.790.510 3.830 1.500l2.870-2.870C16.950 3.010 14.700 2 12 2A10 10 0 0 0 3.060 7.510L6.400 10.100C7.190 7.740 9.400 5.980 12 5.980Z" />
  </svg>
)
