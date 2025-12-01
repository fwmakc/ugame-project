export function createFile(
  filename: string,
  content: string,
  options: {
    mimeType?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  } = {},
): void {
  const { mimeType = 'text/plain', onSuccess, onError } = options;

  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    link.addEventListener('click', () => {
      // Освобождаем память после клика
      setTimeout(() => {
        URL.revokeObjectURL(url);
        onSuccess?.();
      }, 100);
    });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    onError?.(error as Error);
    console.error('Ошибка при создании файла:', error);
  }
}
