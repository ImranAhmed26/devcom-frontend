import BookAppointment from './BookAppointment';

export default function Contact() {
  return (
    <main className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='pt-32 pb-16 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10' />
        <div className='container mx-auto'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              {`Let's Build Something`}
              <span className='block bg-gradient-to-r from-brandLight to-violet-600 bg-clip-text h-16 text-transparent'>
                {` Amazing Together`}
              </span>
            </h1>
            <p className='text-xl text-muted-foreground'>
              {`Have a project in mind? We'd love to discuss how we can help bring
              your vision to life.`}
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <BookAppointment />
    </main>
  );
}
