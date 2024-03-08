const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-center mb-4">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <p className="text-lg text-center">
        Please check the URL or go back to the{" "}
        <a className="text-blue-500" href="/">
          homepage
        </a>
        .
      </p>
      <button
        className="text-lg text-center text-blue-500"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
