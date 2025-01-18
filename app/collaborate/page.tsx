import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from a database or API
const projects = [
  { id: 1, title: "Group Research on Renewable Energy", participants: 5 },
  { id: 2, title: "Collaborative Coding Project", participants: 3 },
  { id: 3, title: "Educational Video Series Production", participants: 4 },
]

export default function CollaboratePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Collaborative Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Participants: {project.participants}</p>
              <Link href={`/collaborate/${project.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
                Join Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

