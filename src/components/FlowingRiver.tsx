export default function FlowingRiver() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 bg-transparent opacity-80 mix-blend-multiply dark:mix-blend-screen dark:opacity-20">
      <svg
        className="absolute bottom-0 w-full h-[30vh] min-h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="waves">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            className="fill-black/60 dark:fill-white/10 animate-wave-slow"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            className="fill-black/40 dark:fill-white/15 animate-wave-medium"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            className="fill-black/20 dark:fill-white/20 animate-wave-fast"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            className="fill-black/80 dark:fill-white/5 animate-wave-fastest"
          />
        </g>
      </svg>
    </div>
  );
}
