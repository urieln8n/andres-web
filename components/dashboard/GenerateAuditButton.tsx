import { AuditGeneratorButton } from "./AuditGeneratorButton";

export function GenerateAuditButton({
  leadId,
  hasAudit,
}: {
  leadId: string;
  hasAudit: boolean;
}) {
  return <AuditGeneratorButton leadId={leadId} hasAudit={hasAudit} />;
}
