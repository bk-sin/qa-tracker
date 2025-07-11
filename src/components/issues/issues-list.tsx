'use client';
import { qaData } from '@/mocks/qa-data';
import { useFilterStore } from '@/stores/filter-store';
import IssueSection from './issue-section';

export default function IssuesList() {
  const { searchTerm, statusFilter, selectedSection } = useFilterStore();

  const getFilteredSections = () => {
    return qaData.sections
      .filter(section => {
        if (selectedSection !== 'all' && section.id !== selectedSection) {
          return false;
        }

        return section.issues.some(issue => {
          const matchesSearch = issue.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesStatus = (() => {
            if (statusFilter === 'all') return true;

            const testStatuses = Object.values(issue.tests);

            if (statusFilter === 'pending') {
              return testStatuses.some(test => test.status === 'pending');
            }
            if (statusFilter === 'resolved') {
              return testStatuses.every(test => test.status === 'resolved');
            }
            return true;
          })();

          return matchesSearch && matchesStatus;
        });
      })
      .map(section => ({
        ...section,
        issues: section.issues.filter(issue => {
          const matchesSearch = issue.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const matchesStatus = (() => {
            if (statusFilter === 'all') return true;

            const testStatuses = Object.values(issue.tests);

            if (statusFilter === 'pending') {
              return testStatuses.some(test => test.status === 'pending');
            }
            if (statusFilter === 'resolved') {
              return testStatuses.every(test => test.status === 'resolved');
            }
            return true;
          })();

          return matchesSearch && matchesStatus;
        }),
      }));
  };

  const filteredSections = getFilteredSections();

  return (
    <div className="space-y-6">
      {filteredSections.length > 0 ? (
        filteredSections.map(section => (
          <IssueSection key={section.id} section={section} />
        ))
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            No se encontraron issues que coincidan con los filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}
