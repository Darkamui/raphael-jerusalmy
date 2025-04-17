export default function TailwindTest() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tailwind Test</h1>
      <div className="bg-testRed p-4 mb-4">This should be red</div>
      <div className="bg-primary p-4 mb-4 text-primary-foreground">
        Primary color
      </div>
      <div className="bg-secondary p-4 mb-4 text-secondary-foreground">
        Secondary color
      </div>
    </div>
  );
}
