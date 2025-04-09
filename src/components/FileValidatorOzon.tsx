import React, { useEffect } from "react";
import ExcelJS from "exceljs";

interface FileValidatorProps {
  file: File;
  onValidationSuccess: () => void;
  onValidationError: (errorMessage: string) => void;
}
export const FileValidatorOzon: React.FC<FileValidatorProps> = ({
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

      // Проверка типа в ячейке
      // const getType = (value: any): string => {
      //   if (typeof value === "string") {
      //     if (value == "True" || value == "False") {
      //       return "bool";
      //     }
      //     return "string";
      //   }
      //   if (typeof value === "number") {
      //     if (value % 1 !== 0) {
      //       return "float";
      //     }
      //     return "number";
      //   }
      //   if (value === null || value === undefined) return "null";
      //   return typeof value;
      // };

      // Проверка заголовков
      const expectedHeaders = [
        "Дата начисления",
        "Тип начисления",
        "Номер отправления или идентификатор услуги",
        "Дата принятия заказа в обработку или оказания услуги",
        "Склад отгрузки",
        "SKU",
        "Артикул",
        "Название товара или услуги",
        "Количество",
        "За продажу или возврат до вычета комиссий и услуг",
        "Ставка комиссии",
        "Комиссия за продажу",
        "Сборка заказа",
        "Обработка отправления (Drop-off/Pick-up) (разбивается по товарам пропорционально количеству в отправлении)",
        "Магистраль",
        "Последняя миля (разбивается по товарам пропорционально доле цены товара в сумме отправления)",
        "Обратная магистраль",
        "Обработка возврата",
        "Обработка отмененного или невостребованного товара (разбивается по товарам в отправлении в одинаковой пропорции)",
        "Обработка невыкупленного товара",
        "Логистика",
        "Индекс локализации",
        "Обратная логистика",
        "Итого",
        "Эквайринг",
        "Нормативность",
        "СС ед.товара",
        "СС",
        "Маркетинг",
      ];

      // const expectedTypes = [
      //   ["object"], // Дата начисления
      //   ["string"], // Тип начисления
      //   ["string"], // Номер отправления или идентификатор услуги
      //   ["object"], // Дата принятия заказа в обработку или оказания услуги
      //   ["string"], // Склад отгрузки
      //   ["string"], // SKU
      //   ["string"], // Артикул
      //   ["string"], // Название товара или услуги
      //   ["number"], // Количество
      //   ["number", "float"], // За продажу или возврат до вычета комиссий и услуг
      //   ["number", "float"], // Ставка комиссии
      //   ["number", "float"], // Комиссия за продажу
      //   ["number"], // Сборка заказа
      //   ["number"], // Обработка отправления
      //   ["number"], // Магистраль
      //   ["number", "float"], // Последняя миля
      //   ["number"], // Обратная магистраль
      //   ["number"], // Обработка возврата
      //   ["number"], // Обработка отмененного или невостребованного товара
      //   ["number"], // Обработка невыкупленного товара
      //   ["number", "float"], // Логистика
      //   ["number", "float", "string"], // Индекс локализации
      //   ["number"], // Обратная логистика
      //   ["number", "float"], // Итого
      //   ["number", "float"], // Эквайринг
      //   ["bool"], // Нормативность
      //   ["number", "float"], // СС ед.товара
      //   ["number", "float"], // СС
      //   ["number", "float"], // Маркетинг
      // ];

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

      // // Проверка на пустые ячейки
      // const rowCount = worksheet.actualRowCount;
      // const colCount = worksheet.actualColumnCount;
      // console.log(`Строк: ${rowCount} Столбцов: ${colCount}`);
      // // Проверка на пустые строки
      // for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
      //   const row = worksheet.getRow(rowIndex);

      //   // Проверка, что row.values существует и является массивом
      //   if (Array.isArray(row.values)) {
      //     const isRowEmpty = row.values
      //       .slice(1, colCount + 1)
      //       .every(
      //         (cell) => cell === null || cell === undefined || cell === ""
      //       );
      //     if (isRowEmpty) {
      //       onValidationError(`Ошибка: Пустая строка на позиции ${rowIndex}`);
      //       throw new Error(`Пустая строка на позиции ${rowIndex}`);
      //     }

      //     // Проверка на пустые ячейки
      //     for (let colIndex = 1; colIndex <= colCount; colIndex++) {
      //       const cell = row.getCell(colIndex);
      //       const cellValue = cell.value;
      //       if (colIndex !== 5 && colIndex !== 22 && colIndex !== 29) {
      //         if (
      //           cellValue === null ||
      //           cellValue === undefined ||
      //           cellValue === ""
      //         ) {
      //           onValidationError(
      //             `Ошибка: Пустая ячейка обнаружена на позиции ${cell.address}`
      //           );
      //           throw new Error(`Пустая ячейка на позиции ${cell.address}`);
      //         }
      //       }
      //     }
      //   }
      // }

      // Проверка данных строк
      // const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(202[0-9]|2030)$/; // Если кто-то в 2031 году будет искать причину ошибки, она тут
      // worksheet.eachRow((row, rowIndex) => {
      //   if (rowIndex > 1) {
      //     row.eachCell((cell, colIndex) => {
      //       // const expectedType = expectedTypes[colIndex - 1];
      //       const cellAddress = cell.address;
      //       const actualValue = cell.value;
      //       const actualType = getType(actualValue); // Определение типа

      //       // Проверка столбца дат
      //       if (colIndex === 5 && typeof actualValue === "object") {
      //         // Перевод типа Date в String
      //         const actualValueAsText = String(actualValue);
      //         // приведение строки к формату даты 21.01.2025
      //         const date = new Date(actualValueAsText);
      //         const formattedDate = date.toLocaleDateString("ru-RU");
      //         if (!dateRegex.test(formattedDate)) {
      //           onValidationError(
      //             `Ошибка: Неверный формат даты в ячейке ${cell.address}. Ожидается ДД.ММ.ГГГГ.`
      //           );
      //           throw new Error("Неверный формат даты.");
      //         }
      //       }

      //       // Проверка типа в ячейке
      //       if (!expectedType.includes(actualType)) {
      //         onValidationError(
      //           `Ошибка: В ячейке ${cellAddress} ожидается тип ${expectedType.join(
      //             " или "
      //           )}, но найдено значение типа ${actualType}`
      //         );
      //         throw new Error(`Неверный тип данных в ячейке ${cellAddress}`);
      //       }
      //     });
      //   }
      // });

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
