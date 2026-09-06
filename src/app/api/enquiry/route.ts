import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  travelType: z.string().optional(),
  destination: z.string().optional(),
  travelDate: z.string().optional(),
  numTravellers: z.string().optional(),
  budget: z.string().optional(),
  preferredPackage: z.string().optional(),
  message: z.string().optional(),
  website: z.string().max(0, 'Bot detected').optional(), // Honeypot
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });

    const { website, ...data } = parsed.data;
    if (website) return NextResponse.json({ success: true }); // Silently ignore bots

    const referer = request.headers.get('referer') ?? '';
    let utmSource, utmMedium, utmCampaign;
    try {
      const url = new URL(referer);
      utmSource = url.searchParams.get('utm_source') ?? undefined;
      utmMedium = url.searchParams.get('utm_medium') ?? undefined;
      utmCampaign = url.searchParams.get('utm_campaign') ?? undefined;
    } catch {}

    await prisma.lead.create({
      data: { ...data, source: 'website', utmSource, utmMedium, utmCampaign, status: 'new' },
    });

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
