export const copyToClipboard = async (text: string) => {
  try {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return "Text copied to clipboard successfully.";
    } else {
      // If Clipboard API is not available, fall back to using document.execCommand
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  } catch (error) {
    console.error("Unable to copy text to clipboard:", error);
  }
};
