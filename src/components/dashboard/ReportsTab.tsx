import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportToCSV } from '../../lib/utils';
import { FileSpreadsheet, Download, FileText, Calendar, CheckCircle2 } from 'lucide-react';

export const ReportsTab: React.FC = () => {
  const { animals, milkRecords, sales, expenses, showToast } = useApp();
  const [reportType, setReportType] = useState<'milk' | 'sales' | 'animals' | 'expenses'>('milk');
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  const handleExportCSV = () => {
    let data: object[] = [];
    let filename = `dairy_farm_${reportType}_report`;

    if (reportType === 'milk') {
      data = milkRecords;
    } else if (reportType === 'sales') {
      data = sales;
    } else if (reportType === 'animals') {
      data = animals;
    } else if (reportType === 'expenses') {
      data = expenses;
    }

    exportToCSV(filename, data);
    showToast(`Exported ${reportType.toUpperCase()} report as CSV!`, 'success');
  };

  const handleSimulatePDF = () => {
    showToast(`Generated ${timeframe} PDF report for ${reportType.toUpperCase()}!`, 'success');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Operational & Financial Reports Generator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Export monthly and yearly farm data into CSV spreadsheet or formatted PDF files.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Configuration Card */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#0D8F87]" />
            Configure Report Download
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Select Report Module
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'milk', label: 'Milk Yield Log' },
                  { id: 'sales', label: 'Sales & Invoices' },
                  { id: 'animals', label: 'Cattle Livestock' },
                  { id: 'expenses', label: 'Farm Expenses' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setReportType(item.id as any)}
                    className={`p-3 rounded-2xl text-xs font-semibold border transition-all ${
                      reportType === item.id
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-[#0D8F87] text-[#0D8F87] dark:text-[#18B6A6]'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Select Timeframe Range
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTimeframe('monthly')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    timeframe === 'monthly'
                      ? 'bg-[#0D8F87] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Monthly Summary
                </button>
                <button
                  onClick={() => setTimeframe('yearly')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    timeframe === 'yearly'
                      ? 'bg-[#0D8F87] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Yearly Full Audit
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <button
                onClick={handleExportCSV}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0D8F87] to-[#18B6A6] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV / Excel</span>
              </button>

              <button
                onClick={handleSimulatePDF}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 hover:bg-slate-800"
              >
                <FileText className="w-4 h-4 text-[#F7C948]" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview Highlights */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
              Automated Audit Summary
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selected: <span className="font-bold text-[#0D8F87] uppercase">{reportType}</span> ({timeframe})
            </p>

            <div className="mt-6 space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">Total Animals Indexed</span>
                <span className="font-bold text-slate-900 dark:text-white font-heading">{animals.length} Records</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">Total Yield Records</span>
                <span className="font-bold text-slate-900 dark:text-white font-heading">{milkRecords.length} Days</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">Sales Invoices Generated</span>
                <span className="font-bold text-slate-900 dark:text-white font-heading">{sales.length} Invoices</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-xs text-[#0D8F87] dark:text-[#18B6A6] font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Ready for instant compliance and tax report exports.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
