import { apiClient } from "./api-client";
import type {
  ImportPreviewOptions,
  ImportPreviewResponse,
  ConfirmImportDto,
  ConfirmImportResponse,
} from "@/types/api";

export const importActions = {
  // POST /import/preview (multipart) — parseia o extrato, NÃO salva.
  async preview(
    file: File,
    options: ImportPreviewOptions,
  ): Promise<ImportPreviewResponse> {
    const form = new FormData();
    form.append("file", file);
    form.append("format", options.format);
    if (options.delimiter) form.append("delimiter", options.delimiter);
    if (options.decimalSeparator)
      form.append("decimalSeparator", options.decimalSeparator);
    if (options.dateFormat) form.append("dateFormat", options.dateFormat);
    if (options.hasHeader !== undefined)
      form.append("hasHeader", String(options.hasHeader));
    if (options.dateColumn) form.append("dateColumn", options.dateColumn);
    if (options.amountColumn) form.append("amountColumn", options.amountColumn);
    if (options.descriptionColumn)
      form.append("descriptionColumn", options.descriptionColumn);
    if (options.typeColumn) form.append("typeColumn", options.typeColumn);

    const res = await apiClient.post<ImportPreviewResponse>(
      "/import/preview",
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },

  // POST /import/confirm (JSON) — persiste em lote (source=IMPORTED, dedup no backend).
  async confirm(data: ConfirmImportDto): Promise<ConfirmImportResponse> {
    const res = await apiClient.post<ConfirmImportResponse>(
      "/import/confirm",
      data,
    );
    return res.data;
  },
};
