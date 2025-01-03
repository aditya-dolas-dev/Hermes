import { Send } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white/5 backdrop-blur-xl">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl bg-white/10 flex items-center
           justify-center animate-bounce hover:bg-white/15 transition-colors duration-300 backdrop-blur-sm"
            >
              <Send className="w-10 h-10 text-white/90" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-semibold text-white/90">
          Welcome to Hermes!
        </h2>
        <p className="text-white/60 text-lg">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
