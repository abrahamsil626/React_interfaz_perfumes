import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'

export default function NotFoundPage() {
  return (
    <Section label="No encontrada" className="text-center">
      <Eyebrow className="mb-4">Error 404</Eyebrow>
      <Heading as="h1" size="xl">No está en el archivo</Heading>
      <p className="mx-auto mt-6 max-w-md font-text text-[18px] italic text-body">
        La página que buscas ha sido retirada o nunca existió.
      </p>
      <div className="mt-10">
        <Button to="/">Volver al inicio</Button>
      </div>
    </Section>
  )
}
