export default function Modal({ open, onClose, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Acesso negado
        </h2>

        <p className="mb-6 text-gray-700">{message}</p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}