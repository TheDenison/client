import React, { useState } from "react";
import axios from "axios";
import "/src/styles/Upload.css";

import { FileValidator } from "./FileValidator";
import { FileValidatorOzon } from "./FileValidatorOzon";
import { FileValidatorStandart } from "./FileValidatorStandart";
import { FileValidatorPlanInventory } from "./FileValidatorPlanInventory";
import { FileValidatorIncomePlan } from "./FileValidatorIncomePlan";

const Upload: React.FC = () => {
  // Отдельные состояния для каждого файла
  const [filePlan, setFilePlan] = useState<File | null>(null);
  const [filePlanSales, setFilePlanSales] = useState<File | null>(null);
  const [filePlanGoal, setFilePlanGoal] = useState<File | null>(null);
  const [fileOzoneRealizationReport, setFileOzoneRealizationReport] =
    useState<File | null>(null);
  const [fileStandard, setFileStandard] = useState<File | null>(null);
  const [filePlanInventory, setFilePlanInventory] = useState<File | null>(null);
  const [fileIncomePlan, setFileIncomePlan] = useState<File | null>(null);

  // Отдельное состояние для статуса загрузки каждого файла
  const [uploadStatusPlan, setUploadStatusPlan] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusPlanSales, setUploadStatusPlanSales] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusPlanSalesGoal, setUploadStatusPlanSalesGoal] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusOzon, setUploadStatusOzon] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusStandard, setUploadStatusStandard] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusPlanInventory, setUploadStatusPlanInventory] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadStatusIncomePlan, setUploadStatusIncomePlan] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleValidationSuccess = (
    fileType: string,
    file: File,
    setUploadStatus: React.Dispatch<
      React.SetStateAction<"idle" | "loading" | "success" | "error">
    >,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    setUploadStatus("success");
    if (file.name === fileType) {
      return;
    }
    // Создаём новый файл с новым именем
    const renamedFile = new File([file], fileType, { type: file.type });

    // Обновляем состояние, чтобы дальше использовать переименованный файл
    setFile(renamedFile);
    alert(
      `Файл "${file.name}" успешно прошёл проверку! Переименован в "${fileType}"`
    );
  };

  // Вывод ошибок
  const handleValidationError = (
    fileType: string,
    errorMessage: string,
    setUploadStatus: React.Dispatch<
      React.SetStateAction<"idle" | "loading" | "success" | "error">
    >
  ) => {
    setUploadStatus("error");
    alert(`Ошибка. ${errorMessage} при загрузке ${fileType}`);
  };

  // Тест Передачи по API
  const handleFileUploadToApi = async (file: File, endpoint: string) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(`Передали файл с именем ${file.name} и размером ${file.size}`);
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3MzA2YWVhMC1kOGM2LTRjMDgtMzVlNC0wOGRkM2JhZGNjYTAiLCJlbWFpbCI6ImFkbWluMSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNzM3OTgyNjgxLCJleHAiOjE3Mzc5ODYyODEsImlhdCI6MTczNzk4MjY4MSwiaXNzIjoiaHR0cDovL2Rub2RlMSIsImF1ZCI6Imh0dHA6Ly9kbm9kZTEifQ.b1BtvyeESY_N17IWbPHtDpEXBGSyhADN1zFE4ITAoK0"; // Получаем токен
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
        },
      });
      alert(`Файл успешно отправлен: ${response.data}`);
    } catch (error) {
      console.error("Ошибка при отправке файла:", error);
      alert("Произошла ошибка при отправке файла.");
    }
  };

  return (
    <div className="doc-container">
      <h1 className="title">Загрузка документов</h1>
      <div className="templates-section">
        <h2 className="section-title">Шаблоны для скачивания</h2>
        <div className="template-item">
          <span className="template-name">План продаж</span>
          <a
            className="download-button"
            href="/docs/План_продаж.xlsx"
            download="Шаблон План продаж.xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">План продаж ИУ</span>
          <a
            className="download-button"
            href="/docs/План_продаж_ИУ.xlsx"
            download="Шаблон План продаж ИУ.xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">План продаж ИУ цель</span>
          <a
            className="download-button"
            href="/docs/План_продаж_ИУ_цель.xlsx"
            download="Шаблон план продаж ИУ цель.xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">Отчёт реализации Озон</span>
          <a
            className="download-button"
            href="/docs/Отчёт_реализации_Озон.xlsx"
            download="Шаблон Отчёт Реализации Озон.xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">Норматив</span>
          <a
            className="download-button"
            href="/docs/Норматив.xlsx"
            download="Шаблон Норматив.xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">
            План товарный запас (Себестоимость)
          </span>
          <a
            className="download-button"
            href="/docs/План_товарный_запас_себестоимость.xlsx"
            download="Шаблон План товарный запас (Себестоимость).xlsx"
          >
            Скачать
          </a>
        </div>
        <div className="template-item">
          <span className="template-name">План поступления</span>
          <a
            className="download-button"
            href="/docs/План_поступления.xlsx"
            download="Шаблон План поступления.xlsx"
          >
            Скачать
          </a>
        </div>
      </div>
      <div className="upload-section">
        <h2 className="section-title">Загрузка файлов</h2>
        <div className="upload-item">
          <span className="upload-label">План продаж:</span>
          <div className="upload-status-icon">
            {uploadStatusPlan === "loading" && <div className="spinner"></div>}
            {uploadStatusPlan === "success" && filePlan && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    filePlan,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusPlan === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusPlan("loading"); // Устанавливаем статус загрузки
                setFilePlan(selectedFile);
              } else {
                setUploadStatusPlan("idle");
              }
            }}
            className="upload-input"
          />
          {filePlan && (
            <FileValidator
              file={filePlan}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "План_продаж.xlsx",
                  filePlan,
                  setUploadStatusPlan,
                  setFilePlan
                )
              }
              onValidationError={(error) =>
                handleValidationError("План продаж", error, setUploadStatusPlan)
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">План продаж ИУ:</span>
          <div className="upload-status-icon">
            {uploadStatusPlanSales === "loading" && (
              <div className="spinner"></div>
            )}
            {uploadStatusPlanSales === "success" && filePlanSales && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    filePlanSales,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusPlanSales === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusPlanSales("loading");
                setFilePlanSales(selectedFile);
              } else {
                setUploadStatusPlanSales("idle"); // Если файл не выбран, сбрасываем статус
              }
            }}
            className="upload-input"
          />
          {filePlanSales && (
            <FileValidator
              file={filePlanSales}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "План_продаж_ИУ.xlsx",
                  filePlanSales,
                  setUploadStatusPlanSales,
                  setFilePlanSales
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "План продаж ИУ",
                  error,
                  setUploadStatusPlanSales
                )
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">План продаж ИУ цель:</span>
          <div className="upload-status-icon">
            {uploadStatusPlanSalesGoal === "loading" && (
              <div className="spinner"></div>
            )}
            {uploadStatusPlanSalesGoal === "success" && filePlanGoal && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    filePlanGoal,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusPlanSalesGoal === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusPlanSalesGoal("loading");
                setFilePlanGoal(event.target.files?.[0] || null);
              } else {
                setUploadStatusPlanSalesGoal("idle");
              }
            }}
            className="upload-input"
          />
          {filePlanGoal && (
            <FileValidator
              file={filePlanGoal}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "План_продаж_ИУ_цель.xlsx",
                  filePlanGoal,
                  setUploadStatusPlanSalesGoal,
                  setFilePlanGoal
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "План продаж ИУ Цель",
                  error,
                  setUploadStatusPlanSalesGoal
                )
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">Отчёт реализации Озон:</span>
          <div className="upload-status-icon">
            {uploadStatusOzon === "loading" && <div className="spinner"></div>}
            {uploadStatusOzon === "success" && fileOzoneRealizationReport && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    fileOzoneRealizationReport,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusOzon === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusOzon("loading");
                setFileOzoneRealizationReport(event.target.files?.[0] || null);
              } else {
                setUploadStatusOzon("idle");
              }
            }}
            className="upload-input"
          />
          {fileOzoneRealizationReport && (
            <FileValidatorOzon
              file={fileOzoneRealizationReport}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "Отчёт_реализации_Озон.xlsx",
                  fileOzoneRealizationReport,
                  setUploadStatusOzon,
                  setFileOzoneRealizationReport
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "Отчёт Реализации Озон",
                  error,
                  setUploadStatusOzon
                )
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">Норматив:</span>
          <div className="upload-status-icon">
            {uploadStatusStandard === "loading" && (
              <div className="spinner"></div>
            )}
            {uploadStatusStandard === "success" && fileStandard && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    fileStandard,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusStandard === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusStandard("loading");
                setFileStandard(event.target.files?.[0] || null);
              } else {
                setUploadStatusStandard("idle");
              }
            }}
            className="upload-input"
          />
          {fileStandard && (
            <FileValidatorStandart
              file={fileStandard}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "Норматив.xlsx",
                  fileStandard,
                  setUploadStatusStandard,
                  setFileStandard
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "Норматив",
                  error,
                  setUploadStatusStandard
                )
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">
            План товарный запас (Cебестоимость):
          </span>
          <div className="upload-status-icon">
            {uploadStatusPlanInventory === "loading" && (
              <div className="spinner"></div>
            )}
            {uploadStatusPlanInventory === "success" && filePlanInventory && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    filePlanInventory,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusPlanInventory === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusPlanInventory("loading");
                setFilePlanInventory(event.target.files?.[0] || null);
              } else {
                setUploadStatusPlanInventory("idle");
              }
            }}
            className="upload-input"
          />
          {filePlanInventory && (
            <FileValidatorPlanInventory
              file={filePlanInventory}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "План_товарный_запас_себестоимость.xlsx",
                  filePlanInventory,
                  setUploadStatusPlanInventory,
                  setFilePlanInventory
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "План товарный запас (Cебестоимость)",
                  error,
                  setUploadStatusPlanInventory
                )
              }
            />
          )}
        </div>
        <div className="upload-item">
          <span className="upload-label">План поступления:</span>
          <div className="upload-status-icon">
            {uploadStatusIncomePlan === "loading" && (
              <div className="spinner"></div>
            )}
            {uploadStatusIncomePlan === "success" && fileIncomePlan && (
              <button
                onClick={() =>
                  handleFileUploadToApi(
                    fileIncomePlan,
                    "http://dnode1:8098/api/v1/PlanLoader/plans"
                  )
                }
                className="upload-button"
              >
                Отправить
              </button>
            )}
            {uploadStatusIncomePlan === "error" && (
              <div className="error-icon">❌</div>
            )}
          </div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                setUploadStatusIncomePlan("loading");
                setFileIncomePlan(event.target.files?.[0] || null);
              } else {
                setUploadStatusIncomePlan("idle");
              }
            }}
            className="upload-input"
          />
          {fileIncomePlan && (
            <FileValidatorIncomePlan
              file={fileIncomePlan}
              onValidationSuccess={() =>
                handleValidationSuccess(
                  "План_поступления.xlsx",
                  fileIncomePlan,
                  setUploadStatusIncomePlan,
                  setFileIncomePlan
                )
              }
              onValidationError={(error) =>
                handleValidationError(
                  "План поступления",
                  error,
                  setUploadStatusIncomePlan
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Upload;
