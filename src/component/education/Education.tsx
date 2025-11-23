import Section from "@/component/shared/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { EDUCATION } from "@/data/Portfolio";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-4">
        {EDUCATION.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{edu.title} - {edu.institution}</span>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </CardTitle>
            </CardHeader>

            {/* If you ever add details later, show here */}
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {/* Optional description area */}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
