import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo_reve.png"
      alt="Logo R'Eve Ski Montagne"
      width={60}
      height={60}
      className={`h-[52px] w-[52px] rounded-full object-cover ${className}`}
    />
  );
}
