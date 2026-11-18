
// import Image from "next/image";

// export function ArkylMark() {
//   return (
//     <span className="arkyl-mark">
//       <Image
//         src="/images/logo.png"
//         alt="Arkyl Ventures"
//         width={80}
//         height={80}
//         priority
//       />
//     </span>
//   );
// }

import Image from "next/image";

export function ArkylMark() {
  return (
    <span className="arkyl-mark">
      <Image
        src="/images/logo-icon.png"
        alt="Arkyl Ventures"
        fill
        priority
        sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 44px"
        style={{ objectFit: "contain" }}
      />
    </span>
  );
}