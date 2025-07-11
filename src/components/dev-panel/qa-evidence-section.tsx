import { QAEvidence } from '@/types/dev-panel';
import { FileText } from 'lucide-react';
import Image from 'next/image';

interface QAEvidenceSectionProps {
  evidence: QAEvidence[];
}

export function QAEvidenceSection({ evidence }: QAEvidenceSectionProps) {
  if (evidence.length === 0) return null;

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-medium">
        <FileText className="h-4 w-4" />
        Evidencia de QA
      </h4>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {evidence.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border bg-purple-50 p-3 dark:bg-purple-900/20"
          >
            <div className="mb-2 flex items-center gap-2">
              {item.type === 'image' ? (
                <Image
                  src={item.url || '/placeholder.svg'}
                  alt={item.name}
                  width={300}
                  height={80}
                  className="h-20 w-full rounded object-cover"
                />
              ) : (
                <div className="bg-muted flex h-20 w-full items-center justify-center rounded">
                  <span className="text-muted-foreground text-xs">Video</span>
                </div>
              )}
            </div>
            <p
              className="text-muted-foreground truncate text-xs"
              title={item.name}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
