export async function readFile(filename: string): Promise<string | undefined> {
  try {
    const response = await fetch(filename);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    throw new Error('Не удалось загрузить файл лицензии');
  }
}
