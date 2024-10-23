// Firebase 인덱스 관련 에러 발생시 사용자에게 알림 표시
// 사용자가 필요한 인덱스를 생성 할 수 있도록 안내하는 모달 표시

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FirebaseIndexErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  indexLink: string | null;
}

export const FirebaseIndexErrorModal: React.FC<
  FirebaseIndexErrorModalProps
> = ({ isOpen, onClose, indexLink }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Firebase 인덱스 생성 필요</DialogTitle>
        </DialogHeader>
        <p>쿼리 실행을 위해 Firebase 인덱스를 생성해야 합니다.</p>
        {indexLink && (
          <DialogFooter>
            <Button asChild>
              <a href={indexLink} target="_blank" rel="noopener noreferrer">
                인덱스 생성하기
              </a>
            </Button>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
