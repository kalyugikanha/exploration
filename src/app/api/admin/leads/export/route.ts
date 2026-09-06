import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const leads = await prisma.lead.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(from || to ? { createdAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  const rows = leads.map(lead => ({
    'Name': lead.name, 'Email': lead.email, 'Phone': lead.phone, 'Travel Type': lead.travelType ?? '',
    'Destination': lead.destination ?? '', 'Travel Date': lead.travelDate ?? '', 'Travellers': lead.numTravellers ?? '',
    'Budget': lead.budget ?? '', 'Preferred Package': lead.preferredPackage ?? '', 'Message': lead.message ?? '',
    'Status': lead.status, 'Source': lead.source ?? '', 'UTM Source': lead.utmSource ?? '',
    'UTM Medium': lead.utmMedium ?? '', 'UTM Campaign': lead.utmCampaign ?? '', 'Notes': lead.notes ?? '',
    'Follow Up Date': lead.followUpDate ? lead.followUpDate.toISOString().split('T')[0] : '',
    'Submitted At': lead.createdAt.toLocaleString('en-IN'),
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Leads');
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  const filename = `exploration-tours-leads-${new Date().toISOString().split('T')[0]}.xlsx`;
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
