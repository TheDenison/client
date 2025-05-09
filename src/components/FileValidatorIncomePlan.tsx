import React, { useEffect } from "react";
import ExcelJS from "exceljs";

interface FileValidatorProps {
  file: File;
  onValidationSuccess: () => void;
  onValidationError: (errorMessage: string) => void;
}
export const FileValidatorIncomePlan: React.FC<FileValidatorProps> = ({
  file,
  onValidationSuccess,
  onValidationError,
}) => {
  const validateFile = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const buffer = await file.arrayBuffer();
      await workbook.xlsx.load(buffer);
      // Проверка листов
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        onValidationError("Лист не найден или пуст.");
        return;
      }
      // Проверка на количество листов
      if (workbook.worksheets.length !== 1) {
        onValidationError(
          `Ожидается один лист, но их ${workbook.worksheets.length}.`
        );
        return;
      }
      // Проверка заголовков
      const expectedHeaders = [
        "Дата",
        "Артикул",
        "Клиент",
        "Склад",
        "план закупа в шт.",
        "план закупа в руб.",
        "план закупа в кнт",
      ];
      const row = worksheet.getRow(1);
      const actualHeaders = Array.isArray(row.values)
        ? row.values.slice(1)
        : [];

      // Проверка на количество  столбцов
      if (actualHeaders.length !== expectedHeaders.length) {
        onValidationError(
          `Количество столбцов не соответствует ожидаемому (${expectedHeaders.length})`
        );
        throw new Error(
          "Количество столбцов не соответствует ожидаемому (${expectedHeaders.length})."
        );
      }

      // Проверка на совпадение всех заголовков
      const headerMismatches: string[] = [];
      expectedHeaders.forEach((expected, index) => {
        if (expected !== actualHeaders[index]) {
          headerMismatches.push(
            `Ожидалось: "${expected}", Получено: "${actualHeaders[index] || "пусто"}"`
          );
        }
      });

      if (headerMismatches.length > 0) {
        onValidationError(
          `Неверные заголовки столбцов:\n${headerMismatches.join("\n")}`
        );
      }
      onValidationSuccess();
    } catch (error) {
      console.error("Ошибка при обработке файла:", error);
      //   onValidationError("Произошла ошибка при валидации файла.");
    }
  };

  useEffect(() => {
    validateFile();
  }, [file]);

  return null; // Компонент сам выполняет логику, ничего не отображает
};
