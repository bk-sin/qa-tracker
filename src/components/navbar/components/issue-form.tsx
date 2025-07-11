import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { priorities, qaData, sections } from '@/mocks/qa-data';
import { NewIssue } from '@/types/issue';

interface IssueFormProps {
  newIssue: NewIssue;
  onUpdateIssue: (field: keyof NewIssue, value: string) => void;
}

interface SelectFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onValueChange: (value: string) => void;
  options: Array<{ id: string; name: string } | string>;
}

function SelectField({
  label,
  value,
  placeholder,
  onValueChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => {
            const key = typeof option === 'string' ? option : option.id;
            const displayValue =
              typeof option === 'string' ? option : option.name;
            return (
              <SelectItem key={key} value={key}>
                {displayValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export function IssueForm({ newIssue, onUpdateIssue }: IssueFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <SelectField
        label="Sección"
        value={newIssue.section}
        placeholder="Selecciona una sección"
        onValueChange={value => onUpdateIssue('section', value)}
        options={sections}
      />

      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe el issue encontrado..."
          value={newIssue.description}
          onChange={e => onUpdateIssue('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Prioridad"
          value={newIssue.priority}
          onValueChange={value => onUpdateIssue('priority', value)}
          options={priorities}
        />

        <SelectField
          label="Asignado a"
          value={newIssue.assignedTo}
          placeholder="Selecciona developer"
          onValueChange={value => onUpdateIssue('assignedTo', value)}
          options={qaData.developers}
        />
      </div>
    </div>
  );
}
