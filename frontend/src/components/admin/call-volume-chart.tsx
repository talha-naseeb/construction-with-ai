'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function CallVolumeChart({ values }: { values: number[] }) {
  const options: ApexOptions = {
    chart: { type: 'area', toolbar: { show: false }, fontFamily: 'var(--font-ops)', foreColor: '#66746d', parentHeightOffset: 0 },
    colors: ['#18343b'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 0.6, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 100] } },
    markers: { size: 4, colors: ['#e9b543'], strokeColors: '#18343b', strokeWidth: 2, hover: { size: 6 } },
    grid: { borderColor: '#d8e0dc', strokeDashArray: 4, padding: { left: 2, right: 8, top: 4, bottom: -8 } },
    dataLabels: { enabled: false },
    tooltip: { theme: 'light', y: { formatter: (value) => `${value} calls` } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { fontSize: '10px', fontWeight: 600 } } },
    yaxis: { show: false, min: 0, forceNiceScale: true }
  };
  return <Chart options={options} series={[{ name: 'Inbound calls', data: values }]} type="area" height={210} width="100%" />;
}
