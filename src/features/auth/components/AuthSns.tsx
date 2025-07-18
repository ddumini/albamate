import Image from 'next/image';
import Link from 'next/link';

const snsList = [
  {
    name: 'google',
    href: '/api/auth/signin/google',
  },
  {
    name: 'kakao',
    href: '/api/auth/signin/kakao',
  },
];

const AuthSns = () => {
  return (
    <div>
      <h3 className="font-regular relative flex items-center justify-center gap-12 text-md text-gray-300 before:block before:h-1 before:flex-1 before:bg-line-100 after:block after:h-1 after:flex-1 after:bg-line-100 after:content-[''] lg:gap-30 lg:text-xl">
        SNS 계정으로 로그인하기
      </h3>
      <ul className="mt-24 flex items-center justify-center gap-16 lg:mt-40">
        {snsList.map(({ name, href }) => (
          <li key={name}>
            <Link
              className="flex aspect-square w-48 items-center justify-center rounded-full border border-line-100 transition-colors duration-200 hover:bg-line-100 lg:w-72"
              href={href}
            >
              <Image
                alt={name}
                className="h-18 w-18 lg:h-27 lg:w-27"
                height={27}
                src={`/logos/${name}.svg`}
                width={27}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthSns;
