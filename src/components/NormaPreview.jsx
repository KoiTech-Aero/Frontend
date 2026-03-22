import { Link } from "react-router";

export default function NormaPreview() {
  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      <Link to="/visualizarNorma">
        <div className="bg-amber-50 w-80 h-60 rounded-2xl cursor-pointer"></div>
      </Link>
      <Link to="/visualizarNorma">
        <div className="bg-amber-50 w-80 h-60 rounded-2xl cursor-pointer"></div>
      </Link>
      <Link to="/visualizarNorma">
        <div className="bg-amber-50 w-80 h-60 rounded-2xl cursor-pointer"></div>
      </Link>
    </div>
  );
}
