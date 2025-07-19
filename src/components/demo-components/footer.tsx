interface Url{
    url:string[],
}
export const Footer:React.FC<Url> = ({url}) => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with React + TypeScript • Hosted on GitHub Pages
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href={url[0]}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={url[1]}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
