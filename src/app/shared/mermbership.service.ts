import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MembershipModel } from './models/membership.model';
import { PendingPurchasesMembership } from './models/pending-purchases-membership.model';

@Injectable({
  providedIn: 'root',
})
export class MermbershipService {
  constructor(private http: HttpClient) {}

  create() {
    return this.http.post<MembershipModel>(
      environment.api_url + '/membership',
      {}
    );
  }

  getMembershipPurchaseData(id: string) {
    return this.http.get<PendingPurchasesMembership>(
      `${environment.api_url}/membership/purchases/byMembership/${id}`
    );
  }

  patchMembershipPurchaseData(id: string, data: any) {
    return this.http.patch<PendingPurchasesMembership>(
      `${environment.api_url}/membership/purchase/${id}`,
      data
    );
  }

  createPurchaseMemebership(data: any) {
    return this.http.post(`${environment.api_url}/membership/purchase`, data);
  }

  verifyPendingPurchase(
    id: string,
    verified: boolean,
    rejectionReason: string
  ) {
    return this.http.patch<PendingPurchasesMembership>(
      `${environment.api_url}/membership/purchase/${id}/verify`,
      {
        verified,
        rejectionReason,
      }
    );
  }

  getPendingPurchases() {
    return this.http.get<PendingPurchasesMembership[]>(
      `${environment.api_url}/membership/purchases/pendings`
    );
  }
}
