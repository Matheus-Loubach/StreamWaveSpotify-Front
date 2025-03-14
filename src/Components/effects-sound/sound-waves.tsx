import { IoMusicalNotes } from "react-icons/io5"
import { FaMusic } from "react-icons/fa"
import { MdMusicNote } from "react-icons/md"

export default function SoundWaves() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute sm:left-1/4 sm:top-1/4 left-1/5 top-1/5 text-pink-500 opacity-70">
        <MdMusicNote size={32} />
      </div>
      <div className="absolute sm:right-1/3 sm:top-1/3 right-1/4 top-1/4 text-cyan-500 opacity-70">
        <IoMusicalNotes size={32} />
      </div>
      <div className="absolute sm:bottom-1/4 sm:left-1/3 bottom-1/5 left-1/4 text-purple-500 opacity-70">
        <FaMusic size={32} />
      </div>
      <div className="absolute sm:bottom-1/3 sm:right-1/4 bottom-1/4 right-1/5 text-pink-500 opacity-70">
        <MdMusicNote size={32} />
      </div>

      <div className="absolute sm:h-[200vh] sm:w-[200vh] h-[150vh] w-[150vh] animate-pulse rounded-full border border-pink-500/20"></div>
      <div
        className="absolute sm:h-[180vh] sm:w-[180vh] h-[140vh] w-[140vh] animate-pulse rounded-full border border-purple-500/20"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="absolute sm:h-[160vh] sm:w-[160vh] h-[120vh] w-[120vh] animate-pulse rounded-full border border-cyan-500/20"
        style={{ animationDelay: "0.4s" }}
      ></div>
      <div
        className="absolute sm:h-[140vh] sm:w-[140vh] h-[100vh] w-[100vh] animate-pulse rounded-full border border-pink-500/20"
        style={{ animationDelay: "0.6s" }}
      ></div>
      <div
        className="absolute sm:h-[120vh] sm:w-[120vh] h-[80vh] w-[80vh] animate-pulse rounded-full border border-purple-500/20"
        style={{ animationDelay: "0.8s" }}
      ></div>
      <div
        className="absolute sm:h-[100vh] sm:w-[100vh] h-[60vh] w-[60vh] animate-pulse rounded-full border border-cyan-500/20"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="absolute h-full w-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
            style={{
              top: `${5 + i * 5}%`,
              opacity: Math.random() * 0.5,
              transform: `scaleY(${Math.random() * 2 + 1})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
