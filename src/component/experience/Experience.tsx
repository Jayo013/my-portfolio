import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { EXPERIENCE } from "@/data/Portfolio";

export default function Experience() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="space-y-4">
        {EXPERIENCE.map((job) => (
          <Card key={job.company}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{job.role} · {job.company}</span>
                <span className="text-sm text-muted-foreground">{job.period}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                {job.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
