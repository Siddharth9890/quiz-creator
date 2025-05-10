import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 md:px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-quiz-purple-dark">
        <BookOpen size={28} className="text-quiz-purple" />
        <span className="text-xl font-semibold tracking-tight">Spark Quiz</span>
      </Link>
    </header>
  );
};

export default Header;
