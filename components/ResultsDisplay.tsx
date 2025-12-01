import React from 'react';
import { SimulationSummary } from '../types';
import { formatCurrency } from '../services/calculator';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ResultsDisplayProps {
  summary: SimulationSummary;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ summary }) => {
  // Prepare data for chart - downsampling if too many points to improve performance/visuals
  const chartData = summary.details.filter((_, index) => {
    // If more than 60 months, show every 6th month, else show all
    if (summary.details.length > 60) return index % 6 === 0;
    return true;
  }).map(d => ({
    name: d.month,
    Saldo: d.balanceAfterWithdrawal,
    TotalRetirado: d.totalWithdrawn,
    TotalJuros: d.totalInterest
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md border border-blue-800">
          <p className="text-blue-200 text-sm font-medium mb-1">Saldo Final Restante</p>
          <p className="text-2xl font-bold">{formatCurrency(summary.finalBalance)}</p>
        </div>
        <div className="bg-white text-slate-800 p-4 rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-medium mb-1">Total Retirado</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalWithdrawn)}</p>
        </div>
        <div className="bg-white text-slate-800 p-4 rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm font-medium mb-1">Total em Juros Acumulados</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalInterestEarned)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">Evolução do Saldo</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }} 
                tick={{fontSize: 12}}
              />
              <YAxis 
                tickFormatter={(value) => 
                  new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short" }).format(value)
                }
                tick={{fontSize: 12}}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Mês ${label}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Area 
                type="monotone" 
                dataKey="Saldo" 
                stroke="#1e40af" 
                fillOpacity={1} 
                fill="url(#colorSaldo)" 
                name="Saldo Disponível"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800 text-center">Tabela Detalhada</h3>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Mês</th>
                <th scope="col" className="px-6 py-3 font-semibold text-right">Rendimentos (Juros)</th>
                <th scope="col" className="px-6 py-3 font-semibold text-right">Retiradas</th>
                <th scope="col" className="px-6 py-3 font-semibold text-right">Saldo Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {summary.details.map((row) => (
                <tr key={row.month} className={`hover:bg-blue-50/50 transition-colors ${row.isZeroed ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.month}</td>
                  <td className="px-6 py-4 text-right text-green-600 font-medium">
                    {formatCurrency(row.interestAmount)}
                  </td>
                  <td className="px-6 py-4 text-right text-red-600">
                    {row.month === 0 ? formatCurrency(0) : formatCurrency(row.balanceBeforeWithdrawal - row.balanceAfterWithdrawal)}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${row.isZeroed ? 'text-red-500' : 'text-blue-900'}`}>
                    {formatCurrency(row.balanceAfterWithdrawal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;