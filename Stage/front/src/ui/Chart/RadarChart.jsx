
import { Unstable_RadarChart as RadarChart } from '@mui/x-charts/RadarChart';

export default function BasicRadar() {
  return (
    <RadarChart
      height={300}
      series={[{ data: [120, 98, 86, 99, 85, 65] }]}
      radar={{
        max: 120,
        metrics: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      }}
    />
  );
}