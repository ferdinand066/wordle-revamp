const navigation = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ferdinand066/",
    icon: (
      <i className="fa-brands fa-instagram text-lg hover:text-purple-800 transition-all"></i>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/ferdinand066/",
    icon: (
      <i className="fa-brands fa-github text-lg hover:text-black-800 transition-all"></i>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ferdinand-gunawan-08aa44192/",
    icon: (
      <i className="fa-brands fa-linkedin text-lg hover:text-blue-800 transition-all"></i>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 border-t border-gray-200">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Ferdinand Gunawan.
          </p>
        </div>
      </div>
    </footer>
  );
}
