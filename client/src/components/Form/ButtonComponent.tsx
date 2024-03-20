interface ButtonComponentsProps {
  text: string;
  handleEvent: () => void
}

export const ButtonComponent = ({ text, handleEvent }: ButtonComponentsProps) => {
  return (
    <>
      <button
        className="bg-lavender hover:bg-indigo-800 text-white py-2 px-4 rounded-full"
        onClick={handleEvent}
      >
        {text}
      </button>
    </>
  );
};
