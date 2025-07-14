import Image from 'next/image';

const HeroSection = () => {
  const fileList = [
    '/images/landing/hero-file01.png',
    '/images/landing/hero-file02.png',
    '/images/landing/hero-file03.png',
    '/images/landing/hero-file04.png',
  ];
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-black-400">
      <h1 className="relative h-29 w-204">
        <span className="sr-only">알바메이트</span>
        <Image fill alt="알바메이트" src="/logos/logo.svg" />
      </h1>
      <p className="font-regular text-center text-[56px] text-gray-50">
        한 곳에서 관리하는 알바 구인 플랫폼
      </p>
      <div className="relative h-610 w-964">
        <Image
          alt="알바메이트"
          className="absolute right-0 bottom-0 z-1"
          height={515}
          src="/images/landing/hero-file-bg.png"
          width={909}
        />
        <ul className="h-full w-full">
          {fileList.map((file, _index) => (
            <li key={file} className="absolute z-2 h-293 w-256">
              <Image fill alt="알바메이트" src={file} />
            </li>
          ))}
        </ul>
        <Image
          alt="알바메이트"
          className="absolute bottom-0 left-0 z-3"
          height={390}
          src="/images/landing/hero-file-fw.png"
          width={798}
        />
      </div>
    </section>
  );
};

export default HeroSection;
