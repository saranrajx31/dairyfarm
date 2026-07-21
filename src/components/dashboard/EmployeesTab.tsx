import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../lib/utils';
import { UserCheck, Phone, Calendar, DollarSign, CheckCircle2, XCircle } from 'lucide-react';

export const EmployeesTab: React.FC = () => {
  const { employees, searchQuery } = useApp();

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Farm Employee & Roster Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track staff attendance, veterinary technicians, milking supervisors, and monthly payroll.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-[#0D8F87] dark:text-[#18B6A6] text-[10px] font-bold">
                  {emp.role}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    emp.attendance_status === 'Present'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : emp.attendance_status === 'On Leave'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {emp.attendance_status}
                </span>
              </div>

              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {emp.name}
              </h3>

              <div className="space-y-1.5 mt-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0D8F87]" />
                  <span>{emp.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#18B6A6]" />
                  <span>Joined: {emp.join_date}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Monthly Salary</span>
              <span className="text-base font-bold font-heading text-slate-900 dark:text-white">
                {formatCurrency(emp.salary)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
