import React from 'react';

interface CompetitionTimeProps {
  time: string;
  className?: string;
}

/**
 * Componente padronizado para exibição dos horários oficiais das competições do JASC 2026.
 * Aplica rigorosamente letter-spacing: 0.08em (tracking-[0.08em]) sem alterar peso, fonte ou cor.
 */
export const CompetitionTime: React.FC<CompetitionTimeProps> = ({ time, className = '' }) => {
  return (
    <span className={`tracking-[0.08em] competition-time ${className}`.trim()}>
      {time}
    </span>
  );
};
