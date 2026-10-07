import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'

export default function NotFoundPage() {
  return (
    <Section label="Not found" className="text-center">
      <Eyebrow className="mb-4">Error 404</Eyebrow>
      <Heading as="h1" size="xl">Not in the archive</Heading>
      <p className="mx-auto mt-6 max-w-md font-text text-[18px] italic text-body">
        The page you are looking for has been withdrawn or never existed.
      </p>
      <div className="mt-10">
        <Button to="/">Return home</Button>
      </div>
    </Section>
  )
}
