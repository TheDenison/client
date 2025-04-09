import React, { useEffect } from "react";
import ExcelJS from "exceljs";

interface FileValidatorProps {
  file: File;
  onValidationSuccess: () => void;
  onValidationError: (errorMessage: string) => void;
}

export const FileValidator: React.FC<FileValidatorProps> = ({
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
        onValidationError("Ошибка: Лист не найден или пуст.");
        return;
      }
      // Проверка на количество листов
      if (workbook.worksheets.length !== 1) {
        onValidationError(
          `Ошибка: Ожидается один лист, но их ${workbook.worksheets.length}.`
        );
        return;
      }

      // Проверка типа в ячейке
      const getType = (value: any): string => {
        if (typeof value === "string") return "string";
        if (typeof value === "number") {
          if (value % 1 !== 0) {
            // console.log("FLOAT");
            return "float";
          }
          //   console.log("NUMBER");
          return "number";
        }
        if (value === null || value === undefined) return "null";
        return typeof value;
      };

      // Проверка заголовков
      const expectedHeaders = [
        "Площадка",
        "Артикул",
        "Количество",
        "Стоимость",
        "Дата Месяц",
      ];

      const expectedTypes = [
        ["string"], // Площадка
        ["string"], // Артикул
        ["number", "float"], // Количество
        ["number", "float"], // Стоимость
        ["object"], // Дата Месяц
      ];

      const expectedNames = [
        "ФИЗИЧЕСКОЕ ЛИЦО (для Вайлдберриз (с 05.08.2024 РВБ))",
        "ФИЗИЧЕСКОЕ ЛИЦО (для ОЗОН)",
        "ФИЗИЧЕСКОЕ ЛИЦО (для Сбермегамаркет)",
        "ФИЗИЧЕСКОЕ ЛИЦО (для Детский Мир)",
        "ФИЗИЧЕСКОЕ ЛИЦО (для Магнит Маркет (КазаньЭкспресс до 25.12.2023))",
        "ФИЗИЧЕСКОЕ ЛИЦО (для ЯндексМаркет)",
      ];

      const row = worksheet.getRow(1);
      const actualHeaders = Array.isArray(row.values)
        ? row.values.slice(1)
        : [];

      // Проверка на количество  столбцов
      if (actualHeaders.length !== expectedHeaders.length) {
        onValidationError(
          `Ошибка: Количество столбцов не соответствует ожидаемому (${expectedHeaders.length}).`
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

      // Проверка на пустые ячейки
      const rowCount = worksheet.actualRowCount;
      const colCount = worksheet.actualColumnCount;
      // Проверка на пустые строки
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        const row = worksheet.getRow(rowIndex);

        // Проверка, что row.values существует и является массивом
        if (Array.isArray(row.values)) {
          const isRowEmpty = row.values
            .slice(1, colCount + 1)
            .every(
              (cell) => cell === null || cell === undefined || cell === ""
            );
          if (isRowEmpty) {
            onValidationError(`Ошибка: Пустая строка на позиции ${rowIndex}`);
            throw new Error(`Пустая строка на позиции ${rowIndex}`);
          }

          // Проверка на пустые ячейки
          for (let colIndex = 1; colIndex <= colCount; colIndex++) {
            const cell = row.getCell(colIndex);
            const cellValue = cell.value;

            if (
              cellValue === null ||
              cellValue === undefined ||
              cellValue === ""
            ) {
              onValidationError(
                `Ошибка: Пустая ячейка обнаружена на позиции ${cell.address}`
              );
              throw new Error(`Пустая ячейка на позиции ${cell.address}`);
            }
          }
        }
      }

      // Проверка данных строк
      const dateRegex =
        /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(202[0-9]|2030)$/; // Если кто-то в 2031 году будет искать причину ошибки, она тут
      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 1) {
          row.eachCell((cell, colIndex) => {
            const expectedType = expectedTypes[colIndex - 1];
            const cellAddress = cell.address;
            const actualValue = cell.value;
            const actualType = getType(actualValue); // Определение типа
            const nameValue = row.getCell(1).value; // Первый столбец "Площадка"

            // Проверка столбца дат
            if (colIndex === 5 && typeof actualValue === "object") {
              // Перевод типа Date в String
              const actualValueAsText = String(actualValue);
              // приведение строки к формату даты 21.01.2025
              const date = new Date(actualValueAsText);
              const formattedDate = date.toLocaleDateString("ru-RU");
              if (!dateRegex.test(formattedDate)) {
                onValidationError(
                  `Ошибка: Неверный формат даты в ячейке ${cell.address}. Ожидается ДД.ММ.ГГГГ.`
                );
                throw new Error("Неверный формат даты.");
              }
            }

            // Проверка соответствия именам в списке expectedNames
            if (
              typeof nameValue === "string" &&
              !expectedNames.includes(nameValue)
            ) {
              onValidationError(
                `Ошибка: Значение "${nameValue}" в ячейке "${cell.address}" недопустимо.`
              );
              throw new Error(
                `Недопустимое значение в ячейке "${cell.address}": "${nameValue}"`
              );
            }

            // Проверка типа в ячейке
            if (!expectedType.includes(actualType)) {
              onValidationError(
                `Ошибка: В ячейке ${cellAddress} ожидается тип ${expectedType.join(
                  " или "
                )}, но найдено значение типа ${actualType}`
              );
              throw new Error(`Неверный тип данных в ячейке ${cellAddress}`);
            }
          });
        }
      });

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
